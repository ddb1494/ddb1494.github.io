### 定义
```javascript
let a,b,c;

a = [1,'a',true,null,,,]
console.log(a)		// [ 1, 's', true, null, <2 empty item> ]

b = [2,'b', ...a]
console.log(b)		// [ 2, 'b', 1, 'a', true, null, undefined, undefined ]

c = Array.from( {1:'c',length:5, name:'c'} )
console.log(c)		// [ undefined, 'c', undefined, undefined, undefined ]
console.log(c.name)	// undefined
```
#### 判断是否是数组
```javascript
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```
#### 数组5兄弟
接下来让我们熟悉一下这5个兄弟吧。<br>
首先，设置一个变量a。<br>
5个兄弟都用这个变量来做测试。
```javascript
let a = [
	1,2,3,
	'a','b','c',
	true,false,
	null,undefined,NaN
];
```
- 老大 .forEach()<br>
遍历数组, 什么都不返回.
```javascript
array.forEach((e,i,a)=>{
	// 参数a就是数组array, 输出内容过长, 这里省略
	console.log('内容:%s, 位置:%i',e,i)
})
```
> `内容:1, 位置:0`<br>
> `内容:2, 位置:1`<br>
> `内容:3, 位置:2`<br>
> `内容:a, 位置:3`<br>
> `内容:b, 位置:4`<br>
> `内容:c, 位置:5`<br>
> `内容:true, 位置:6`<br>
> `内容:false, 位置:7`<br>
> `内容:null, 位置:8`<br>
> `内容:undefined, 位置:9`<br>
> `内容:NaN, 位置:10`<br>
- 老二 .map()<br>
遍历并返回新元素组成的数组.
```javascript
b=a.map((e,i,a)=>{
	return 'prefix-'+e+'-'+i;
})
console.log(b)
```
> ```javascript
> [ 'prefix-1-0',
>   'prefix-2-1',
>   'prefix-3-2',
>   'prefix-a-3',
>   'prefix-b-4',
>   'prefix-c-5',
>   'prefix-true-6',
>   'prefix-false-7',
>   'prefix-null-8',
>   'prefix-undefined-9',
>   'prefix-NaN-10' ]
> ```
- 老三 .filter()<br>
过滤出仅符合要求的元素的数组.

```javascript
let b=a.filter((e,i,a)=>{
	return !isNaN(e)
})
console.log(b)
```
> ```javascript
> [ 1, 2, 3, true, false, null ]
> ```
- 老四 .every()<br>
对所有元素做评估, 全部符合要求时返回true, 只要有一个不符合要求就返回false.<br>
true   全部都符合要求<br>
false  哪怕只要有一个不符合
```javascript
b=a.every((e,i,a)=>{
	return !isNaN(e)
})
console.log(b)	// false
```
- 老五 .some()<br>
对所有元素做评估, 全部不符合要求时返回false, 只要有一个不符合要求就返回true.<br>
true   哪怕只要有一个符合就行<br>
false  全部都不符合
```javascript
b=a.some((e,i,a)=>{
	return !isNaN(e)
})
console.log(b)	// true
```
### 转为数组
Array.from( arrayLike [, mapFn[, _this]])<br>
@`arrayLike`  要转为数组的数据<br>
@`mapFn`  遍历元素时的map函数，function(e){ return e; }体内写返回新元素的规则。<br>
@`_this`  用于`mapFn`中的this所指向的数据。
```javascript
let
s = 'string',
n = 123.456,
b = true,
map, set, a, arr


// Map与Array互转
map = new Map( [[1,'name'], [2,'age']] )
arr = Array.from(map)	
console.log(map)	// Map { 1 => 'name', 2 => 'age' }
console.log(arr)	// [ [ 1, 'name' ], [ 2, 'age' ] ]
// 但要注意Map的特性
arr = [ [1,'a'],[1,'aaa'],[2,'b'] ]
map = new Map(arr)
arr = Array.from(map)
console.log(map)	// Map { 1 => 'aaa', 2 => 'b' }
console.log(arr)	// [ [ 1, 'aaa' ], [ 2, 'b' ] ]
// 相同键会被替换掉，只剩一个键。
// 这个有点像 Object.assign() 的效果。



// Set与Array互转
set = new Set( ['name','age'] );
arr = Array.from(set);
console.log(set)	// Set { 'name', 'age' }
console.log(arr)	// [ 'name', 'age' ]
// 但是要注意Set的特性
arr = [1,2,1,1,1,1,3]
set = new Set(arr)
arr = Array.from(set)
console.log(set)	// Set { 1, 2, 3 }
console.log(arr)	// [ 1, 2, 3 ]
// 相同值已经被去掉，只剩唯一值了。



// String与Array互转
arr = Array.from(s)	// 等同于 s.split('')
s = arr.join('')
console.log(arr)	// [ 's','t','r','i','n','g' ]
console.log(s)		// 'string'



// 函数参数转为数组
function f(){
	return Array.from(arguments)
}
console.log(f(1,2,3))	// [ 1,2,3 ]


// 类似于map的效果
arr = Array.from( [1,2,3], x=>x*x )
console.log(arr)	// [ 1,4,9 ]

// 使用第三个参数，map函数中调用this
Array.from([1,2], function(x){
	return this * x
}, 4)
console.log(arr)	// [ 4,8 ]
```
### 多个参数合并为一个数组
```javscript
let a

a=Array.of(1,2,3)			// [ 1,2,3 ]
a=Array.of()				// []
a=Array.of(undefined)		// [ undefined ]

a=Array(3)					// [,,,]
a=Array(1,2,3)				// [ 1,2,3 ]
a=Array(undefined)			// [ undefined ]
a=Array()					// []
console.log(a)
```
#### 拼接数组

```javascript
let a,b,c

a=['a']
b=[['b']]
c=[[['c']]]

console.log(a.concat(b,c))  //['a',['b'],[['c']]]
console.log(a.concat(1))  // ['a',1]
// concat 只会剥开一层皮
```


#### 内部复制
arr.copyWithin(target[, start[, end]])
```javascript
let a,b
a=['a','b','c']
b=a.copyWithin(1,2)   // 

console.log(b)  // [ 'a','c','c' ]  1位置复制索引2的内容
```



#### 迭代函数

- Array Iterator
```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

/*Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/
```

- iterator.next()
```javascript
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());

/*{value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key":"value"]的数组，是返回的迭代器中的元素值。
```

- iterator.next方法运行
```javascript
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}
    
console.log(a);
// 遍历完毕，输出next.value的数组
```
- 二维数组按行排序
```javascript
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);

/*(4) [Array(2), Array(5), Array(5), Array(4)]
    0:(2) [1, 34]
    1:(5) [2, 3, 44, 234, 456]
    2:(5) [1, 4, 5, 6, 4567]
    3:(4) [1, 23, 34, 78]
    length:4
    __proto__:Array(0)
*/
```
- 使用for…of 循环
```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```



```javascript
let arr = [1,2,3,4,5];
let res;



{
	console.group('forEach');
	res = arr.forEach( (e,i,a)=> {
		console.log('row',e,i,a);
		return e;
	} );
	console.log('forEach:', res);// undefined
	console.groupEnd('forEach');
}



{
	console.group('map');
	res = arr.map( (e,i,a)=>{
		console.log('row',e,i,a);
		return e+100;
	});
	console.log('map:', res);
	console.groupEnd('map');
}



{
	console.group('filter');
	res = arr.filter( (e,i,a)=>{
		console.log('row',e,i,a);
		return e%2==0;
	} );
	console.log('filter:', res);
	console.groupEnd('filter');
}



{
	console.group('every');
	res = arr.every((e,i,a)=>{
		console.log('row',e,i,a);
		return e<3;
	});
	console.log('every:', res);
	console.groupEnd('every');
}



{
	console.group('some');
	res = arr.some((e,i,a)=>{
		console.log('row',e,i,a);
		return e<3;
	});
	console.log('some:', res);
	console.groupEnd('some')
}



{
	console.group('reduce');
	res = arr.reduce((r,e,i,a)=>{
		console.log('row',r,e,i,a);
		return r+e;
	});
	console.log('reduce:', res);
	console.groupEnd('reduce');
}


/* 输出结果
forEach
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  forEach: undefined
map
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  map: [ 101, 102, 103, 104, 105 ]
filter
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  filter: [ 2, 4 ]
every
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  every: false
some
  row 1 0 [ 1, 2, 3, 4, 5 ]
  some: true
reduce
  row 1 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 3 2 [ 1, 2, 3, 4, 5 ]
  row 6 4 3 [ 1, 2, 3, 4, 5 ]
  row 10 5 4 [ 1, 2, 3, 4, 5 ]
  reduce: 15
[Finished in 0.4s]forEach
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  forEach: undefined
map
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  map: [ 101, 102, 103, 104, 105 ]
filter
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  row 4 3 [ 1, 2, 3, 4, 5 ]
  row 5 4 [ 1, 2, 3, 4, 5 ]
  filter: [ 2, 4 ]
every
  row 1 0 [ 1, 2, 3, 4, 5 ]
  row 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 2 [ 1, 2, 3, 4, 5 ]
  every: false
some
  row 1 0 [ 1, 2, 3, 4, 5 ]
  some: true
reduce
  row 1 2 1 [ 1, 2, 3, 4, 5 ]
  row 3 3 2 [ 1, 2, 3, 4, 5 ]
  row 6 4 3 [ 1, 2, 3, 4, 5 ]
  row 10 5 4 [ 1, 2, 3, 4, 5 ]
  reduce: 15
 */
```
