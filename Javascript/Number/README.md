### 数值的定义

```javascript
let n;

n=123;       // 整数
n=Infinity;  // 表示无穷大
n=-Infinity; // 表示无穷小
n=NaN;       // 不是数值
n=123.456;  // 小数
n=1.234e3;  // 1.234*1000 等于 1234    科学表示
n=1234e-3;  // 1.234/1000 等于 1.234

n=0b1111;   // 15   2进制表示法
n=0o17;     // 15   8进制表示法
n=15;       // 15   10进制表示法
n=0xf;      // 15   16进制表示法
```


### 进制转换

- 10转换为其他进制

```javascript
let s;
let n=15;

n .toString(2);     // '1111'   二进制
n .toString(8);     // '17'     八进制
n .toString();      // '10'     十进制
n .toString(16);    // 'f'      十六进制
n .toString(36);    // 'f'      三十六进制(已达上限) [0-9a-z](36个)
```

- 其他进制转十进制

```javascript
[
parseInt('1111', 2),// 15  十进制
parseInt('17',   8),// 15  十进制
parseInt('15',  10),// 15  十进制
parseInt('f',   16),// 15  十进制
parseInt('z',   36) // 35  十进制
]
```


### 静态属性

```javascript
let a=[
Number.EPSILON,              // 2.220446049250313e-16   两个可表示(representable)数之间的最小间隔。
Number.MAX_SAFE_INTEGER,     // 9007199254740991   JavaScript 中最大的安全整数 (253 - 1)
Number.MAX_VALUE,            // 1.7976931348623157e+308   能表示的最大正数。最小的负数是 -MAX_VALUE
Number.MIN_SAFE_INTEGER,     // -9007199254740991   JavaScript 中最小的安全整数 (-(253 - 1))
Number.MIN_VALUE,            // 5e-324   能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE
Number.NaN,                  // NaN   特殊的“非数字”值
Number.NEGATIVE_INFINITY,    // -Infinity   特殊的负无穷大值，在溢出时返回该值
Number.POSITIVE_INFINITY,    // Infinity  特殊的正无穷大值，在溢出时返回改值
]
// console.log(a)
```


### 静态方法

```javascript
// Number.isNaN()              // 确定传递的值是否是 NaN。
// Number.isFinite()           // 确定传递的值类型及本身是否是有限数。
// Number.isInteger()          // 确定传递的值类型是“number”，且是整数。
// Number.isSafeInteger()      // 确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1之间)。
// Number.toInteger()          // 计算传递的值并将其转换为整数 (或无穷大)。
// Number.parseFloat()         // 和全局对象 parseFloat() 一样。
// Number.parseInt()           // 和全局对象 parseInt() 一样
```


- Number.isNaN() 和全局的isNaN有区别。

```javascript
console.log(NaN==NaN, NaN===NaN)    // false false  无法比较两个NaN是否相等，所以只能用判断函数

let a=[
Number.isNaN(NaN),        // true
Number.isNaN(Number.NaN), // true
Number.isNaN(0 / 0),       // true
Number.isNaN("NaN"),      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined),  // false
Number.isNaN({}),         // false
Number.isNaN("blabla"),   // false
Number.isNaN(true),       // false
Number.isNaN(null),       // false
Number.isNaN(37),         // false
Number.isNaN("37"),       // false
Number.isNaN("37.37"),    // false
Number.isNaN(""),         // false
Number.isNaN(" "),        // false
]
console.log(a)

let b=[
isNaN(NaN),        // true
isNaN(Number.NaN), // true
isNaN(0 / 0),      // true
isNaN("NaN"),      // true
isNaN(undefined),  // true
isNaN({}),         // true
isNaN("blabla"),   // true
isNaN(true),       // false
isNaN(null),       // false
isNaN(37),         // false
isNaN("37"),       // false
isNaN("37.37"),    // false
isNaN(""),         // false
isNaN(" "),        // false
]
console.log(b)
```


- Number.isSafeInteger(v)
v的安全整数范围为

 -(Math.pow(2,53) - 1)到 Math.pow(2,53) - 1 之间的整数，
包含 -(Math.pow(2,53) - 1)和 Math.pow(2,53) - 1。

```javascript
Number.isSafeInteger(3);                    // true
Number.isSafeInteger(Math.pow(2, 53) - 1)   // true
Number.isSafeInteger(Math.pow(2, 53))       // false
Number.isSafeInteger(NaN);                  // false
Number.isSafeInteger(Infinity);             // false
Number.isSafeInteger("3");                  // false
Number.isSafeInteger(3.1);                  // false
Number.isSafeInteger(3.0);                  // true
```


- Number.isFinite()和全局isFinite()
表示给定的值是否是一个有穷数

```javascript
let a=[
Number.isFinite(Infinity),  // false
Number.isFinite(NaN),       // false
Number.isFinite(-Infinity), // false

Number.isFinite('0'),       // false   不是数值类型，直接返回 false
isFinite('0'),              // true    强制转换类型后做出判断

Number.isFinite(0),         // true
Number.isFinite(2e64)       // true
]
console.log(a)
```


- Number.isInteger()
如果被检测的值是整数，则返回 true，否则返回 false。注意 NaN 和正负 Infinity 不是整数。

```javascript
let a=[
Number.isInteger(0),         // true
Number.isInteger(1),         // true
Number.isInteger(-100000),   // true

Number.isInteger(0.1),       // false
Number.isInteger(Math.PI),   // false

Number.isInteger(NaN),       // false
Number.isInteger(Infinity),  // false
Number.isInteger(-Infinity), // false
Number.isInteger("10"),      // false
Number.isInteger(true),      // false
Number.isInteger(false),     // false
Number.isInteger([1])        // false
]
console.log(a)
```


- Number.parseFloat() 同于 全局的parseFloat()

```javascript
// 浮点数的正则表达式
// /^(\-|\+)?|(\.\d+)(\d+(\.\d+)?|(\d+\.)|Infinity)$/
let a=[
parseFloat("3.14"),                           // 3.14
parseFloat("314e-2"),                         // 3.14
parseFloat("0.0314E+2"),                      // 3.14
parseFloat("3.14more non-digit characters"),  // 3.14
parseFloat('.421'),              // 0.421
parseFloat('421.'),              // 421
parseFloat('421.421'),           // 421.421
parseFloat('421'),               // 421
parseFloat('421e+0'),            // 421
parseFloat('+421'),              // 421
parseFloat('-421'),              // -421
parseFloat('Infinity'),          // Infinity
parseFloat('-Infinity'),         // -Infinity
parseFloat("FF2"),               // NaN
parseFloat('hop1.61803398875'),  // NaN
parseFloat('421hop'),            // 421
parseFloat("999 888"),           // 999

]
console.log(a)
```

- Number.parseInt() 与 全局 parseInt() 完全一样



### ++ -- 默认都是加减1，但却根据位置不同，当时的结果也不同

```javascript
let  x

x=9
console.log(x--)	// 9
console.log(x)		// 8

x=9
console.log(--x)	// 8
console.log(x)		// 8
```


#### += -= 就是运算后的结果

```javascript
let  x

x=9
console.log(x-=2)	// 7
console.log(x)		// 7
```


