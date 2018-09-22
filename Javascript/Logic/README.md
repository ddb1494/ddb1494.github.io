### while循环

- 以下两段代码返回结果一样
```javascript
let i=4;

while(i-->0){
  console.log(i)
}
```
倒序
```json
3
2
1
0
```
```javascript
let i=0, len=4;

while(i<len){
  console.log(i)
  i++
}
```
升序
```json
0
1
2
3
```




