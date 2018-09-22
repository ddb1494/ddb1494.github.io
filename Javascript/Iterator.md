### Iterator

```javascript 1
function* iterator(){
  yield 'k';
  yield 'kk';
}

let g=iterator(), r;

while(true){
  r=g.next();
  if(r.done) break;
  console.log('iterator---k:', r.value);
}
```
