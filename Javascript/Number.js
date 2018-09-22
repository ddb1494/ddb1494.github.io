{// 数值的定义
    let n;
    
    n=1;
    n=Infinity;
    n=NaN;
    n=123.456;
    
    n=0b1111;   // 15   2进制表示法
    n=0x17;     // 15   8进制表示法
    n=15;       // 15   10进制表示法
    n=0xf;      // 15   16进制表示法
}



// 进制转换
{// 10转换为其他进制
    let s;
    let n=15;
    
    n .toString(2);     // '1111'   二进制
    n .toString(8);     // '17'     八进制
    n .toString();      // '10'     十进制
    n .toString(16);    // 'f'      十六进制
    n .toString(36);    // 'f'      三十六进制(已达上限) [0-9a-z](36个)
}
{// 其他进制转十进制
	[
	parseInt('1111', 2),// 15  十进制
	parseInt('17',   8),// 15  十进制
	parseInt('15',  10),// 15  十进制
	parseInt('f',   16),// 15  十进制
	parseInt('z',   36) // 35  十进制
	]
}


{// 静态属性
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
}


{// 静态方法
    // Number.isNaN()              // 确定传递的值是否是 NaN。
    // Number.isFinite()           // 确定传递的值类型及本身是否是有限数。
    // Number.isInteger()          // 确定传递的值类型是“number”，且是整数。
    // Number.isSafeInteger()      // 确定传递的值是否为安全整数 ( -(253 - 1) 至 253 - 1之间)。
    // Number.toInteger()          // 计算传递的值并将其转换为整数 (或无穷大)。
    // Number.parseFloat()         // 和全局对象 parseFloat() 一样。
    // Number.parseInt()           // 和全局对象 parseInt() 一样
}


{// Number.isNaN() 和全局的isNaN有区别。
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
}

