注: Promise本身是占主进程的

#### Promise异步处理, 但他并非子进程, 所以会卡死主进程

```javascript
console.log(1);
let p=new Promise((y)=>{
    let d=Date.now();
    while((Date.now()-d)<2000){};
    console.log(3);
});
p.then( (v)=>console.log(v) );
console.log(2);
// 如果Promise本身是异步, 那我们应该得出 1,2,3 ,但是我们却得到了1,3,2
// 主进程输出1后, 卡顿2秒钟后一并输出了3,2
// 如果我们把Promise里误会成开子进程处理, 那么就要吃大亏了
// 比如在Promise中计算非常耗时的程序, 还自以为不会卡死主进程...
// 所以promise例子中, 都会用ajax或worker, 因为他们才不会卡主进程.
```


#### async function的返回值是隐式包装的Promise.resolve
+ 直接要一个Promise.resolve(v)
```javascript
async function y(v){
    return v;
}

let p=y(1);
console.log(p)  // Promise resolved
p.then(console.log) // 1
```

+ 直接要一个Promise.reject(v)
```javascript
async function n(v){
    throw new Error(v);
// return v   //没来得及
}

let p=n(0)
console.log(p)  // Promise rejected
p.catch((v)=>console.log(v.message))    // 0
```

+ await暂停异步函数, 等待得到解析值
```javascript
async function y(v){
    return v;
}

let v
// v=await y(1);// SyntaxError  await只能在async函数中执行

async function yy(v){
    return await y(v);
}

v=yy(2).then(console.log)   // 2
```

+ 逐个等待结果的r1,r2,r3 (耗时合计6秒)
```javascript
async function y(v,s=1000){
    // console.log('y('+v+')')
    return new Promise((y,n)=>{
        // console.log(Date.now()-start)
        setTimeout(y,s,v)
    })
}

async function call(){
    // console.log('call()', Date.now()-start)
    let r1=await y(1, 1000)
    // console.log(r1, Date.now()-start)
    let r2=await y(2, 2000)
    // console.log(r2, Date.now()-start)
    let r3=await y(3, 3000)
    // console.log(r3, Date.now()-start)
}

let start=Date.now()
call()

// 整理结果如下:
// y(1)     立即     立即创建出Promise实例(p1)，开始计算，延迟1秒后输出结果
// 1        1秒后    p1的结果出来了
// y(2)     1秒后    创建p2，开始计算，延迟2秒后输出结果
// 2        3秒后    p2的结果出来了
// y(3)     3秒后    创建p3，开始计算，延迟3秒后输出结果
// 3        6秒后    p3的结果出来了
```


#### 关于Promise.all()

+ 全部resolve, 所以结果是这些p的数组

```javascript
let p1,p2,p3

p1=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p1'),y(1)},1000)
})
p2=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p2'),y(2)},2000)
})
p3=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p3'),y(3)},3000)
})


Promise.all([p1,p2,p3])
.then(v=>console.log('allThen',v))
.catch(e=>console.log('allCatch ',e))

// p1   1秒后输出
// p2   2秒后输出
// p3   3秒后输出
// allThen [ 1, 2, 3 ]  3秒后输出
```

+ 如果包含报错Promise.reject()
```javascript
let p1,p2,p3

p1=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p1'),y(1)},1000)
})
p2=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p2'),n(2)},2000)
})
p3=new Promise((y,n)=>{
    setTimeout(()=>{console.log('p3'),y(3)},3000)
})


Promise.all([p1,p2,p3])
.then(v=>console.log('allThen',v))
.catch(e=>console.log('allCatch ',e))
// 由于p2是reject, 如果不catch()的话, 将会导致程序异常终止
// 报错时机为 p3 运行结束后
// 即便抢先报错的p2, 也无法让all提前结束, 最耗时的p3才是关键

// 如果侦听catch()
// p1           1秒后输出
// p2           2秒后输出
// allCatch  2  2秒后输出
// p3           3秒后输出

// 如果未侦听catch()
// p1
// p2
// p3
// throw 错误导致程序异常终止
```

#### 关于Promise.race()

- 竞速，看谁更快
```javascript
var p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'p1_ok');
});

var p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'p2_ok');
});

Promise.race([p1, p2]).then(function(v) {
  console.log(v);// 'p2_ok'  p2比p1更快完成了任务
});
```

- race是会在下一个时间点(next tick)得到结果
```javascript
let
p1= Promise.resolve(1),     // Promise {1}   当前已知结果
p2= Promise.resolve(2),     // Promise {2}   当前已知结果
p = Promise.race([ p1,p2 ]) // Promise { <pending> }   当前还未知结果

setTimeout(function(){
    console.log(p);         // Promise {1}   下一个时间节点得到结果
});
```
- 家都已确定了结果时，就看谁在数组的前面吧。
```javascript
let
p1=Promise.resolve('p1_ok'),
p = new Promise(()=>{})

Promise.race([ '字符串、数组、数字、对象、函数都可以', p1 ]).then((v)=>{
    console.log(v)  // '字符串、数组、数字、对象、函数都可以'
})

Promise.race([ p1, null ]).then((v)=>{
    console.log(v)  // 'p1_ok'
})
```

- 竞速，不论是 resolve 还是 reject ，先到即胜
```javascript
let p1, p2

p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 200, 'p1_ok'); 
})
p2 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 100, 'p2_ng'); 
})

Promise.race([ p1,p2 ]).then(function(value) {
  console.log(value)
},function(reason) {
  console.log(reason)   // 'p2_ng'
})
var p1 = new Promise(function(resolve, reject) { 
```



### async,await与try,catch
```javascript
  (async ()=>{
    try{
      console.log('log--', await Promise.resolve('正常结果'))
      console.log(await Promise.reject(new Error('故意输出一个错误')))
    }catch(err){
      console.log('catch--',err.message)
    }
  })();
```
