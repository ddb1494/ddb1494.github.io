class XY{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  toJSON(){
    return `${this.x},${this.y}`;
  }
}


let o;



o={name:'jinxidong',age:31,sex:1,xy:{x:1,y:2}};
// o=['jinxidong',31,1];


let res;

res = JSON.stringify(o, function(k,v,e){
  // console.log(k,v,e,this)
  // return String(v).toUpperCase()
  // console.log(k)
  switch(k){
    case 'name':
      return v.toUpperCase();
    case 'age':
      return v*100;
    case '':
      return v;
    default:
      return v;
  }
  // this.n=1;
  // return '{a:1}';
})

// res=JSON.stringify(o, ['name'],'=')

console.log(res);


o=JSON.parse(res, function(k,v){
  switch(k){
    case 'age':
      return undefined;// 返回undefined可删除该属性值
    case 'name':
      return v.toLowerCase();// 转为大写
    case 'xy':
      return new XY(v.x,v.y);// 转为专用对象
    case '':
      return v;// 返回最终结果
    default:
      return v;// 其他默认
  }
});
console.log(o);



o=['jinxidong',1983,'male'];
res=JSON.stringify(o,['0','1']);
console.log(res);
res=JSON.stringify(o,(k,v)=>{
  if(k=='0'){
    return String(v).toUpperCase();
  }else if(k==='1'){
    return (new Date).getFullYear()-v+1;
  }
  // console.log(typeof k,v)
  return v;
});
console.log(res);


o=JSON.parse('[1,2,3,4]',function(k,v){
  // case 1和case '1'是不一样的,因为比较是===进行.
  switch(k){
    case '1':
      return v*10000;
    case '3':
      return v/100;
    default:
      // console.log(k,v);
      // k,v  :  (0,1)  (1,2)  (2,3)  (3,4)  ('',[1,2,3,4])
      return v;
  }
});

console.log(o)
