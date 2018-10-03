

let o=function(name){
  this.name=name||'o';
};

let po=new Proxy(o, {
  get (target,name){
    // return name in target ? target[name] : po;
    console.log('[get] po.'+name)
    return target[name];
  },
  set (target,k,v){
    console.log('[set] po.'+k+'='+v)
    if(k==='age') v=Number(v) || 19;
    if(v<1 || v>100) throw new RangeError(`年龄超标: 1 <= ${v} <= 100`);
    target[k]=v;
  },
  deleteProperty(o,k){
    console.log('[delete] po.'+k);
    return delete o[k];// 在这里也得删除,才会真正尝试删除.
  },
  enumerate(o,k){
    // console.log('enumarate',k)
    // return new Set(['k']) .values();
    return ['k'];
  },
  ownKeys(o,k){
    // let keys=new Set(['k']) .keys();
    // console.log('ownKeys', o, keys);
    // return (function* (){
    //   yield 'k';
    // })();
    return ['k','v'];
  },
  has(o,k){
    // 需要用in来检测
    // hasOwnProperty不会起作用是因为调用了get,并且因为又是函数调用,
    // 所以可能没有通过这里的in来检测属性是否存在
    // console.log(po.hasOwnProperty('k'), 'hasOwnProperty' in po);// false, true
    console.log('has', k)
    return k in o;
  },
  defineProperty(o,k,e){
    console.log('[defineProperty] po.'+k, e)
    return Object.defineProperty(o,k,e);
  },
  construct(target,args){
    console.log('[construct]',target,args);
    let obj={};
    // console.log(target,args)
    // this.apply(target,obj,args);
    return obj;
  },
  desctruct(target,args){
    console.log('[desctruct]')
  }
});


// o.valueOf=()=>po;

// po.age='12';
// console.log(po.age, o.age)

// console.log(i)
po.k=1;
po.kk=11;
// delete i.k;
// console.log(i)


for(let k in po) {
  console.log('<for> po.'+k+'='+po[k]);
}

console.log('<delete>', delete po.k);
console.log('<get> po.k =', po.k)
// console.log(po.hasOwnProperty('k'), 'hasOwnProperty' in po)

Object.defineProperty(po,'kkk',{value:111});
console.log(po.kkk)

