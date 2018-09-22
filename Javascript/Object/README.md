#### 定义Object
`{}` 与 `new Object()` 一样。<br>
在键值对中，键名只能是字符串，键值可以是任何类型的数据。
```javascript=1
let o1 = { a:'foo', b:42, c:{} };
console.log(o1.a); // 'foo'
```

ES6特性
```javascript=
var {a,b,c,d} = { a:1, b:2, c:3 };
console.log(a);// 1
console.log(b);// 2
console.log(c);// 3
console.log(d);// undefined

// let {a,b}={a:11,b:22,c:33};// SyntaxError: a已定义
// {a,b}={a:11,b:22,c:33};// SyntaxError: 意外标记=
({a,b}={a:11,b:22,c:33});
console.log(a);// 11
console.log(b);// 22
```

如同
```javascript=
let o={a:1, b:2, c:3};
let a=o.a;
let b=o.b;
let c=o.c;
```


- 定义时采用变量，而不是键值对。
```javascript=
let
a = 'foo',
b = 42,
c = {},
o2 = { a,b,c }     // 等同于 {a: a, b: b, c: c}
console.log(o2.b), // 42
```
- 定义了私有变量
```javascript=
let o = {
    _key: 1,
    method: function () { console.log('_key=',this._key) },     // method
    get key() { return this._key; },                            // getter
    set key(v) { this._key=v }                                  // setter
};


console.log(o.key, o._key)      // 1 1
o.key=2                         // 修改 o._key 为 2
console.log(o.key, o._key)      // 2 2
o.method()                      // 输出'_key= 2'
```

- 在定义对象时，键名就可以用变量
```javascript=
let
key = 'key',
o = {
  [key]: 'value',
  [ '_'+key ]: '_value'
}//

console.log(o)  // { key:'value', _key:'_value' }
```

- 用属性访问器方式来定义属性
```javascript=
var i = 0;
var a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3


var param = 'size';
var config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // {size: 12, mobileSize: 4}
```

#### 访问对象属性
```javascript=
let o = { x:1, y:2, z:{deep:3} }
console.log(o.x)            // 1
console.log(o['y'])         // 2
console.log(o['z'].deep)    // 3
```
#### Cenerator就像是iterator
```javascript=
let o = {
  key() {},
  *generator(i) {
    yield i-1
    yield i-2
    yield i-3
    yield i-4
    yield i-5
  }
};
console.log(o)
// { key: [Function: key], generator: [GeneratorFunction: generator] }

let gen=o.generator(10)
console.log(gen.next())     // { value: 9, done: false }
console.log(gen.next())     // { value: 8, done: false }
console.log(gen.next())     // { value: 7, done: false }
console.log(gen.next())     // { value: 6, done: false }
console.log(gen.next())     // { value: 5, done: false }
console.log(gen.next())     // { value: undefined, done: true }
console.log(gen.next())     // { value: undefined, done: true }
```

#### 传播属性
ECMAScript提案（第4阶段）的其余/扩展属性将扩展属性添加到对象文字。它将自己提供的对象的枚举属性复制到一个新的对象上。
使用更短的语法，可以轻松克隆（不包括原型）或合并对象Object.assign()。
```javascript=
let obj1 = { foo:'bar', x:42 };
let obj2 = { foo:'baz', y:13 };

let clonedObj = { ...obj1 };
// Object { foo:"bar", x:42 }

let mergedObj = { ...obj1, ...obj2 };
// Object { foo:"baz", x:42, y:13 }
// 键名冲突时，使用了obj2的键值，就是obj1的键值被替换
```

#### __proto__ 只能设为对象或函数，null是空对象。
```javascript=
let o


o = { __proto__: null }                   // 如同 Object.create(null)
console.log( o.__proto__ )                // undefined
console.log(Object.getPrototypeOf(o))     // null
console.log( o.__proto__ )                // undefined


o = { __proto__:{ x:1,y:2 } }
console.log( o.__proto__ )                // { x:1, y:2 }
console.log(Object.getPrototypeOf(o))     // { x:1, y:2 }
console.log(o.x)                          // 1    可访问到原型上的属性x
o.x=10                                    // 设置了o上的属性x值为10，原型不变
console.log(o.x, o.__proto__.x)           // 10  1


o = { __proto__:o }                       // 原型链就像继承链
o.x=100
console.log(o.x, o.__proto__.x, o.__proto__.__proto__.x)    // 100  10  1


o = { __proto__() {} }                    // 将原型设为函数
console.log(o.__proto__.__proto__ === Function.prototype)   // true
```




### Object构造函数的方法
#### Object.assign()
通过复制一个或多个对象来创建一个新的对象。
用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
```javascript=
let o1,o2
o1 = { a:1, b:2, c:3 };
o2 = Object.assign( {c:4, d:5 }, o1);   // { c:3, d:5, a:1, b:2 }
```

#### Object.create()
使用指定的原型对象和属性创建一个新对象。
```javascript=

```

#### Object.defineProperty()
给对象添加一个属性并指定该属性的配置。
```javascript=

```

#### Object.defineProperties()
给对象添加多个属性并分别指定它们的配置。
```javascript=

```

#### Object.entries()
返回给定对象自身可枚举属性的[key, value]数组。
```javascript=

```

#### Object.freeze()
冻结对象：其他代码不能删除或更改任何属性。
```javascript=

```

#### Object.getOwnPropertyDescriptor()
返回对象指定的属性配置。
```javascript=

```

#### Object.getOwnPropertySymbols()
返回一个数组，它包含了指定对象自身所有的符号属性。
```javascript=

```

#### Object.getPrototypeOf()
返回指定对象的原型对象。
```javascript=

```

#### Object.is()
比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。
```javascript=

```

#### Object.isExtensible()
判断对象是否可扩展。
```javascript=

```

#### Object.isFrozen()
判断对象是否已经冻结。
```javascript=

```

#### Object.isSealed()
判断对象是否已经密封。
```javascript=

```

#### `Object.keys`(obj)  :Array
返回obj可枚举属性名称的数组。

#### `Object.values`(obj)   :Array
返回给定对象自身可枚举值的数组。

#### `Object.getOwnPropertyNames`(obj)  :Array
返回obj可枚举和不可枚举的属性名。

#### 'propertyName' `in` obj
返回obj和obj的继承链中是否有属性名propertyName

```javascript=
let o={
  a:1,
  get b(){ return 2; },
  __proto__: {d:4 }
}
Object.defineProperty(o,'c',{value:3})


console.log(o.a);// 1
console.log(o.b);// 2
console.log(o.c);// 3
console.log(o.d);// 4

console.log('a' in o);// true
console.log('b' in o);// true
console.log('c' in o);// true
console.log('d' in o);// true

console.log(Object.keys(o));// ['a','b']
console.log(Object.values(o));// [1,2]
console.log(Object.getOwnPropertyNames(o));// ['a','b','c']

console.log(o.hasOwnProperty('a'));// true
console.log(o.hasOwnProperty('b'));// true
console.log(o.hasOwnProperty('c'));// true
console.log(o.hasOwnProperty('d'));// false
```

#### Object.preventExtensions()
防止对象的任何扩展。
```javascript=

```

#### Object.seal()
防止其他代码删除对象的属性。
```javascript=

```

#### Object.setPrototypeOf()
设置对象的原型（即内部[[Prototype]]属性）。
```javascript=

```
