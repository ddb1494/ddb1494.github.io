### 运行顺序

```javascript
var a = 18;
f1();
function f1(){
   var b=9;
   console.log(a);//undefined  由于函数体内有a的定义，而且在下面。
   console.log(b);//9
   var a = '123';
}
```


### 作用域

```javascript
f2();
console.log('cc',cc);// 9
console.log('bb',bb);// 9
// console.log('aa',aa);// 报错 is not defined
function f2(){
    let aa = bb = cc = 9;
}
```
