Boolean就是逻辑对错。
有些程序中常用0或1来代替。
```javascript
0 == false
1 == true
```


#### 逻辑
```javascript
    true    // 是，对
    false   // 否，错
```

#### 转换
```javascript
    let a=[
    Boolean(),          // false
    Boolean(0),         // false
    Boolean(false),     // false
    Boolean(null),      // false
    Boolean(NaN),       // false
    Boolean(undefined), // false
    Boolean(''),        // false
    Boolean(true),       // true
    Boolean(Infinity),   // true
    Boolean(-Infinity),  // true
    Boolean({}),         // true
    Boolean([]),         // true
    Boolean('false')     // true
    ]
    console.log(a)
```


#### 不建议使用new Boolean()
创建Boolean对象，会消耗更多的系统资源
```javascript
new Boolean('')
```


#### 比较大小
```javascript
true>false   // true  如同 1>0 是对的一样
false>true   // false 如同 0>1 是错的一样
```
