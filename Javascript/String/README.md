##### 运行环境: chrome, nodejs
### 字符串


#### 定义
```javascript
let s;
// 定义基本类型字符串, 主要有三种符号, 如`'"

// 单行字符串
s='单行字符串';
s="单行字符串";
s='单\
行\
字\
符\
串';// 注意, 行尾\后面不可有空格或字符
console.log(s, s.length);	//单行字符串 5

// 多行字符串
s=`多
行
字
符
串`;
s=String.raw `多
行
字
符
串`;// 通常可省略String.raw
```
#### 转义符, 如`\`
```javascript
let s;
// 定义字符串时, 用到的符号可加入到内容中
// 以'开头时用\';以"开头时用\"即可.
s='转\'移\'符';
s="转\"移\"符";
s=`转\`移\`符`;
```
#### 解析字符串中的表达式
```javascript
let s='2+3';
`${s}=${eval(s)}`;  // "2+3=5"
s+'='+eval(s);      // "2+3=5"
```
#### 模版字符串函数String.raw()
```javascript
let s='2+3';
String.raw `noASCII \x31`;      // noASCII \x31   通常可省略String.raw
String.raw `noASCII \u0031`;    // noASCII \u0031   通常可省略String.raw
String.raw `${s}`;              // 2+3   通常可省略String.raw

String.raw({raw: "abc"}, 1,2,3,4);  // "a1b2c"  用不到吧?
String.raw({ raw: ['foo', 'bar', 'baz'] }, 1,2,3);// foo1bar2baz  多余的3将不被调用
```
#### 编码
```javascript
let s;
s='\x31\x32\x33';         // ASCII编码 \x00~\xFF
s='\u0031\u0032\u0033';   // UTF-8编码 \u0000~\uFFFF
s='\0';                   // \0~\7
s='\0'		// 空字符
s='\''		// 单引号
s='\"'		// 双引号
s='\\'		// 反斜杠
s='\n'		// 换行
s='\r'		// 回车
s='\v'		// 垂直制表符
s='\t'		// 水平制表符
s='\b'		// 退格
s='\f'		// 换页
s='\xff'	// Latin-1 字符(x小写)	
s='\u0031'	// unicode 码
s='\u{31}\u{000032}\u{000033}'	// \u{XXXXXX}	unicode codepoint 
```	
#### 转为字符串, 基本类型和对象
```javascript
let s;

s=String('字符串');        // "字符串"
console.log(s, typeof s);// 2+3 string

s=new String('字符串');      // String {"字符串"}
console.log(s, typeof s);   // [String: '2+3'] object

s=s.valueOf();              // "字符串"
console.log(s.valueOf(), typeof s.valueOf());// 2+3 string
```
#### 字符串索引值
```javascript
let s='一二三四五';
console.log(s[0]==='一');        // true
console.log(s.charAt(0)==='一'); //true

// 只读
s[0]=1;         // 不可写
delete s[3];    // 不可删
console.log(s); // 一二三四五
```
#### 字符串比较
```javascript
let a,b;
a='a';
b='b';
console.log(a.charCodeAt(0), b.charCodeAt(0));// 97, 98 先看看编码值
console.log(a>b);   // false
console.log(a<=b);  // true
a.localeCompare(b); // -1
a.localeCompare(a); // 0
b.localeCompare(a); // 1
```
#### 用Unicode值来创建字符串
```javascript
String.fromCharCode(65,66,67);// 'ABC'
String.fromCharCode(0x31,0x32,0x33);// '123'

String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

String.fromCodePoint('_');      // RangeError
String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1);       // RangeError
String.fromCodePoint(3.14);     // RangeError
String.fromCodePoint(3e-2);     // RangeError
String.fromCodePoint(NaN);      // RangeError
```
#### HTML标签
```javascript
s='字符串';
console.log(s.anchor('anchor'));// <a name="anchor">字符串</a>
console.log(s.fontsize(7));// <font size="7">字符串</font>
console.log(s.fontcolor('red'));// <font color="red">字符串</font>
console.log(s.big());// <big>字符串</big>
console.log(s.small());// <small>字符串</small>
console.log(s.blink());// <blink>字符串</blink>
console.log(s.bold());// <b>字符串</b>
console.log(s.italics());// <i>字符串</i>
console.log(s.strike());// <strike>字符串</strike>
console.log(s.fixed());// <tt>字符串</tt>
console.log(s.sub());// <sub>字符串</sub>
console.log(s.sup());// <sup>字符串</sup>
```
#### 取字取编码
```javascript
s='ABC';
console.log(s[0], s[1], s[2]);				// A B C
console.log(s.charAt(0), s.charAt(1), s.charAt(2));	// A B C
console.log(s.charCodeAt(0), s.charCodeAt(1), s.charCodeAt(2));		// 65 66 67
console.log(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));	// 65 66 67
```
#### 截取讨论重点:

* 注意参数为负数时的区别<br>
* 注意第二参数小于第一参数时的区别
索引位置与字符串图例
```json
  A B C  字符串
 0 1 2 3 位置	
```

- 截取 slice
```javascript
// s.slice(startIndex=0,endIndex=this.length);
// @startIndex, @endIndex	当index为负数时this.length+index
let s='ABC';
s.slice(-1);	// C	因3-1===2, 从位置2开始截取到最后
s.slice(1);	// BC
s.slice(0,-2);	// A	因3-2===1, 从0到1截取
s.slice(2,0);	// ''	因截取方向始终为向右, 所以无法截取
// 取两个索引位置区间的字符串, end小于start时直接返回''
```
- 截取 substring
```javascript
// str.substring(indexStart=0, indexEnd=this.length)
// @indexStart, @indexEnd   负数和NaN将视为0, 大于str长度的将视为str.length
let s='ABC';
s.substring(0,9);// 'ABC'   长度为3, 9被视为3
s.substring(3,0);// 'ABC'   所以头尾对换也无所谓
// 取两个索引位置区间的字符串, end小于start时也可以正常截取
```
- 截取 substr
str.substr(start=0, length=this.length)<br>
@`start`	为负数时, 视为this.length+start, 例如 3+(-2)===1<br>
@`length`	只能是大于等于0，输入负数则视为0
```javascript
let s='ABC';
s.substr(-2);		// BC  开始位置3-2===1, 长度到最后
s.substr(-2,1);		// B   开始位置3-2===1, 长度为1
s.substr(-1,-1);	// 开始位置为3-1===2, 长度为0
// 从指定索引位置开始, 截取一定长度的字符串
```
#### 搜索

```javascript
let s='ABC';
s.includes('A');	// true   从0位置向右找A, 找到了
s.includes('A',1);	// false  从1位置向右找A, 没有找到
s.startsWith('A');	// true   从0位置向右找A, 找到了
s.startsWith('A',1);	// false  从1位置向右找A, 没有找到
s.indexOf('A');		//  0     从0位置向右找A, 在0位置找到了
s.indexOf('A',1);	// -1     从1位置向右找A, 没有找到 -1
s.endsWith('B');	// false  ABC取其长度3, 最后不是B
s.endsWith('B',2);	// true   ABC取长度2, 最后是B
s.lastIndexOf('C');	// 2      从右向左找C, 在位置2上找到了
s.lastIndexOf('C',1);	// -1     从1位置向左找C, 没有找到

s.search('a');		// -1     同等于 s.search(new RegExp('a'))
s.search(/a/i);		// 0      在0位置找到A, 忽略大小写
}
```

#### 填充
- 头部填充
```javascript
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```
- 尾部填充
```javascript
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```
- 反复填充
```javascript
"abc".repeat(-1);     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0);      // ""
"abc".repeat(1);      // "abc"
"abc".repeat(2);      // "abcabc"
"abc".repeat(3.5);    // "abcabcabc" 参数count将会被自动转换成整数.去掉小数点后面的数值.
"abc".repeat(1/0);    // RangeError: repeat count must be positive and less than inifinity. 1/0===Infinity
({toString : () => "abc", repeat : String.prototype.repeat}).repeat(2);
//"abcabc",repeat是一个通用方法,也就是它的调用者可以不是一个字符串对象.
```

#### 去掉空白
```javascript
let s=' TA ';
console.log(s.trim());		// 'TA' 去掉两边空白
console.log(s.trimRight());	// ' TA' 去掉右边空白
console.log(s.trimLeft());	// 'TA ' 去掉左边空白
```

#### 替换
- 替换时可以插入函数,该函数可以处理()匹配到的内容
```javascript
function replacer(match, p1, p2, p3, offset, string) {
	return [p1, p2, p3].join(' - ');
}
let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```
```javascript
function replacer(match, p1, p2, p3, offset, string) {
    console.log('找到匹配内容\t\t', match)
    console.log('第一个括号内容\t\t', p1)
    console.log('第二个括号内容\t\t', p2)
    console.log('第三个括号内容\t\t', p3)
    console.log('找到匹配位置\t\t', offset)
    console.log('源字符串\t\t', string)

    // 将找到的匹配内容，替换成该内容
    let res=match
    if(match){
        res= p1.toUpperCase() + (parseInt(p2)*100) + p3
        console.log('结果：',match,'换成了',res)
    }
    console.log('_'.repeat(32))
    return res;
}

let source = 'a1# b2%'
let target = 'a1# b2%'.replace(/([^\d]*)(\d*)([^\w]*)/g, replacer);
console.log('最终结果：', source, '换成了', target);  // abc - 12345 - #$*%
/*
找到匹配内容		 a1# 
第一个括号内容		 a
第二个括号内容		 1
第二个括号内容		 # 
找到匹配位置		 0
源字符串		 a1# b2%
结果： a1#  换成了 A100# 
________________________________
找到匹配内容		 b2%
第一个括号内容		 b
第二个括号内容		 2
第二个括号内容		 %
找到匹配位置		 4
源字符串		 a1# b2%
结果： b2% 换成了 B200%
________________________________
找到匹配内容		 
第一个括号内容		 
第二个括号内容		 
第二个括号内容		 
找到匹配位置		 7
源字符串		 a1# b2%
________________________________
最终结果： a1# b2% 换成了 A100# B200%
*/
```

- 替换时插入字符串可以用$1~$9,$&来引用匹配到的内容
```javascript
let re = /(.+)\s(.+)/;
let str = "你好 朋友";
let newstr = str.replace(re, "$2 $1");
console.log(newstr);// 朋友 你好
```

- 大写变小写的同时加前缀-( T 编程 -t)
```javascript
(function styleHyphenFormat(propertyName) {
	function upperToHyphenLower(match) {
		return '-' + match.toLowerCase();
	}
	return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
})('borderTop');// border-top
```



#### 正则匹配成数组 str.match()
```javascript
let s='+Infinity -Infinity NaN +3 -3 null 1,2,3';
s.match(9);	// null    没有找到则反馈null
s.match(/\d+/g);	// [ '3', '3', '1', '2', '3' ]
```
传入非正则时, 隐式转换成一个RegExp实例. new RegExp(obj)
```javascript
s.match();		// [ '' ]   隐式转换为 /(?:)/
s.match(+Infinity);// [ 'Infinity' ]   隐式转换为 /Infinity/
s.match(-Infinity);// [ '-Infinity' ]   隐式转换为 /-Infinity/
s.match(+3);		// [ '3' ]   隐式转换为  /3/
s.match(-3);		// [ '-3' ]   隐式转换为  /-3/
s.match(NaN);	// [ 'NaN' ]   隐式转换为  /NaN/
s.match(null);	// [ 'null' ]   隐式转换为  /null/
s.match({});	// [ 't' ]        隐式转换为  /[object Object]/
```


#### 正则表达式替换
```javascript
let s;	// 字符串
let re;	// 正则
let r;	// 结果

s='ABCA';
re=/(.)(.)(.)\1/;// 找到\1是找到的第一个括号中的内容
r=s.replace(re, '$1, $2, $3');// $1是第一个括号中的内容, 支持到1~99. 正则匹配到的全内容是$&, 左为$`,右为$'
console.log(r);// A, B, C

s='ABC';
re=/B/;
console.log(s.replace(re, '$\''));	// ACC B的右边为C, B替换为C
console.log(s.replace(re, '$`'));	// AAC B的左边做A, B替换为A
```

#### 字符串转换为数组
```javascript
let s='ABC';
s.split('');	// ["A", "B", "C"]
s.split('B');	// ["A", "C"]

let a=['A','B','C'];
a.join('');	// 'ABC'
```

#### 大小写
```javascript
let s='Ab';
console.log(s.toLocaleLowerCase());// ab   转为小写(大多数情况与toLowerCase()一样, 土耳其语例外)
console.log(s.toLocaleUpperCase());// AB   转为大写(大多数情况与toUpperCase()一样, 土耳其语例外)
console.log(s.toLowerCase());// ab   转为小写
console.log(s.toUpperCase());// AB   转为大写
```

#### 字符串转数字
```javascript
let s='123.456';
parseInt(s,10);	// 123   按10进制数值进行转换
parseFloat(s);	// 123.456  只能按10进制进行转换

let n=123.456;
n.toString(16);		// "7b.74bc6a7ef9dc"   小数转16进制
123 .toString(16);	// '7b'   整数转16进制
```

#### 字符串拼接
通常用`+`或`+=`来进行拼接, 也可以用 s.`concat`()
```javascript
s+'D'+'E';		// ABCDE   s依然是ABC
s.concat('D','E');	// ABCDE   s依然是ABC
```

#### 思考题
- 随机字符
```javascript
// 内置取0~1之间的随机小数
// 0.7388811323383895 '0.qll8kla04zb'
Math.random().toString(36).substr(2);
```

- 100m 改为 10000cm 的案例
```javascript
function m2cm(match, p1, offset, source){
	let rs=p1*100+'cm';
	console.log(rs, '-', match, p1, offset, source);
	return rs;
}

'100m' .replace(/(\d+)m/, m2cm);// 10000cm - 100m 100 0 100m
```


- 这是mozilla.org 中的[例子](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
一个数组对象。
x 产生一个 on 状态，
-连接符产生一个 off 状态，
而 _ 下划线表示 on 状态的长度。
就像是一种规定格式数据的加密算法 用于传输时, 可以节省宽带流量

- 加密
```javascript
let on='x', off='-', len='_';

let data=[
	{ on: true, length: 1 },
	{ on: false, length: 1 },
	{ on: true, length: 2 }
];

let r=data.map(e=>{
	if(e.on){
		return on.padEnd(e.length,len);
	}else{
		return off;
	}
}).join('');
console.log(r)
```

- 解密
```javascript
let str = 'x-x_', rs;
```
方法1: 用循环解密
```javascript
	let re=/x_*|-/g;
	let m;// 每次匹配内容
	rs=[]
	while(m=re.exec(str)){// 直到找不到为null时停止
		let s=m[0];
		if(s.length>1){
			r.push({ on:true, length:s.length });
		}else{
			r.push({ on:s[0]==='x', length:1 });
		}
	}
}
```
方法2: 用正则替换解密
```javascript
	rs = [];
	str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
	  if (p1) { retArr.push({ on: true, length: p1.length }); }
	  if (p2) { retArr.push({ on: false, length: 1 }); }
	});
}
```

- 思考题
获取一定长度的随机字符串
```javascript
let chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let length=chars.length;

function susu(){
	return Math.floor(Math.random()*length);
}

function str(){
	return chars[susu()];
}

function strs(len=4){
	let s='';
	while(len-->0){
		s+=str();
	}
		return s;
}

console.log(strs(4))
```
