自己写了个颜色值转换的类。

```javascript
console.log(Color.stringify(0xf));	// #00000f
console.log(Color.stringify(0xff));	// #00f
console.log(Color.parse('#00000f'));	// 15
console.log(Color.parse('#f'));		// 255
console.log(Color.parse('#ff'));	// 65535
```
