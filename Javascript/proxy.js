// const mongoose=require('mongoose')
// const Schema=mongoose.Schema;


// mongoose.connect('mongodb://0.0.0.0:3717/test',{useNewUrlParser:true});


// let db=mongoose.connection;


// let docSchema=new Schema({
//   x:Number,
//   y:Number,
//   z:Number
//   // info:{type:String,required:true}
// });
// docSchema.methods.
// docSchema.query.zgt = function(n){
//   return this.where({z:{$gt:n}});
// }


// // docSchema.methods.getZ=function(cb){
// //   console.log(Object.getOwnPropertyNames(this.__proto__), this);
// //   return this;
// // }
// let models={};
// models.doc = mongoose.model('doc', docSchema);

// // console.log(Object.keys(models.doc.__proto__))
// // for(let i=0; i<10; i++) {
// //   models.doc.replaceOne({}, {x:i<<3, y:i<<2, z:i});
// // }

// let docs=db.collection('docs');// NativeCollection{ name:'docs', }
// console.log(docs);
// // docs.find(function(e,cursor){
// //   cursor
// //   console.log(e,r)
// //   // console.log(e,r.toArray((e,r)=>console.log(r)))
// // });


// // db.collection('docs').insertMany([{x:1,y:1,z:1},{x:2,y:2,z:2},{x:3,y:3,z:3}], (e,r)=>console.log(e||r))

// // console.log(db.docs.find({},(e,r)=>console.log(e,r)));





// // http://aonun.com/user/regist




// // models.doc.find().where({z:{$and:[{$gt:96},{$lt:99}]}}).then(e=>console.log(e));
// // models.doc.find().then(e=>console.log(e));



// // 只能添加,不能删除.




// // models.doc.deleteMany().then(e=>console.log(e))  // {n:20,ok:1}

// // let doc=new models.doc({z:96});


// // doc.save().then(e=>console.log(e))

// // wait models.doc.find().then(e=>console.log(e))

// // console.log(()=>console.log(1))



// // let doc=new docModel({
// //   xx:11,yy:22,z:1,info:'haha'
// // });

// // doc.save((e,r)=>console.log(e||r))

// // console.log(models.doc.hooks)
// // console.log(models.doc.base)
// // console.log(models.doc.modelName)
// // console.log(models.doc.model===mongoose.model)
// // console.log(models.doc.db)
// // console.log(models.doc.schema)
// // console.log(models.doc.collection)
// // console.log(models.doc.Qeury)
// // console.log(models.doc.$__insertMany)
// // console.log(models.doc.$init)
// // console.log(models.doc.$caught)
// // console.log(models.doc.$appliedMethods)
// // console.log(models.doc.$appliedHooks)
// // console.log(models.doc.discriminators)

// // console.log(Object.keys(models.doc.__proto__))

// // docModel.findOne({z:1}).then(e=>console.log(e));

// // 组织
// //   游戏名称/类型(开发商,运营商,时间)
  

// // console.log(doc)

// // doc.save().then((r,e)=>{
// //   console.log('save')
// //   console.log(r,e)

// // });

// // docModel.find().then((e,r)=>{
// //   console.log('find')
// //   console.log(e,r)
// // });

// // console.log(doc);


// // a:{$not:{$nlt:3} }});

// // db.c.insertMany([
// // {x:1,y:1},
// // {x:1,y:2},
// // {x:1,y:3},
// // {x:2,y:1},
// // {x:2,y:2},
// // {x:2,y:3},
// // {x:3,y:1},
// // {x:3,y:1},
// // {x:3,y:1},
// // {x:'1',y:'1'},
// // {x:'2',y:'2'},
// // {x:'3',y:'3'},
// // ]);


// // db.c.find({x:{$eq:1}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// */

// // db.c.find({x:{$gt:2}})
// /*
// {x:3,y:1},
// {x:3,y:1},
// {x:3,y:1},
// */

// // db.c.find({x:{$gte:2}})
// /*
// {x:2,y:1},
// {x:2,y:2},
// {x:2,y:3},
// {x:3,y:1},
// {x:3,y:1},
// {x:3,y:1},
// */

// // db.c.find({x:{$lt:2}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// */

// // db.c.find({x:{$lte:2}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// {x:2,y:1},
// {x:2,y:2},
// {x:2,y:3},
// */

// // db.c.find({x:{$in:[1,3]}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// {x:3,y:1},
// {x:3,y:1},
// {x:3,y:1},
// */

// // db.c.find({x:{$ne:2}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// {x:3,y:1},
// {x:3,y:1},
// {x:3,y:1},
// {x:'1',y:'1'},
// {x:'2',y:'2'},
// {x:'3',y:'3'},
// */

// // db.c.find({x:{$nin:[1,2,3,'1','3']}})
// /*
// {x:'2',y:'2'},
// */

// // db.c.find({$or:[{x:1},{x:2}]})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// {x:2,y:1},
// {x:2,y:2},
// {x:2,y:3},
// */

// // db.c.find({$nor:[{x:1},{x:2}]})
// /*
// {x:3,y:1},
// {x:3,y:1},
// {x:3,y:1},
// {x:'1',y:'1'},
// {x:'2',y:'2'},
// {x:'3',y:'3'},
// */

// // db.c.find({x:{$not:{$gte:2}}})
// /*
// {x:1,y:1},
// {x:1,y:2},
// {x:1,y:3},
// {x:'1',y:'1'},
// {x:'2',y:'2'},
// {x:'3',y:'3'},
// */

// /*
// type:
// 1 'double'
// 2 'string'
// 3 'object'
// 4 'array'
// 5 'binData'
// 6 'undefined'
// 7 'objectId'
// 8 'bool'
// 9 'date'
// 10  'null'
// 11  'regex'
// 12  'dbPointer'
// 13  'javascript'
// 14  'symbol'
// 15  'javascriptWithScope'
// 16  'int'
// 17  'timestamp'
// 18  'long'
// 19  'decimal'
// -1  'minKey'
// 127 'maxKey'

// db.c.find({x:{$type:'number'}})
// "_id" : ObjectId("5b8d4b709a921a05f79148b9"), "x" : 1, "y" : 1 }
// "_id" : ObjectId("5b8d4b709a921a05f79148ba"), "x" : 1, "y" : 2 }
// "_id" : ObjectId("5b8d4b709a921a05f79148bb"), "x" : 1, "y" : 3 }
// "_id" : ObjectId("5b8d4b709a921a05f79148bc"), "x" : 2, "y" : 1 }
// "_id" : ObjectId("5b8d4b709a921a05f79148bd"), "x" : 2, "y" : 2 }
// "_id" : ObjectId("5b8d4b709a921a05f79148be"), "x" : 2, "y" : 3 }
// "_id" : ObjectId("5b8d4b709a921a05f79148bf"), "x" : 3, "y" : 1 }
// "_id" : ObjectId("5b8d4b709a921a05f79148c0"), "x" : 3, "y" : 1 }
// "_id" : ObjectId("5b8d4b709a921a05f79148c1"), "x" : 3, "y" : 1 }

// db.c.find({x:{$type:'string'}})
// "_id" : ObjectId("5b8d4b709a921a05f79148c2"), "x" : "1", "y" : "1" }
// "_id" : ObjectId("5b8d4b709a921a05f79148c3"), "x" : "2", "y" : "2" }
// "_id" : ObjectId("5b8d4b709a921a05f79148c4"), "x" : "3", "y" : "3" }
// */






//   // let p=new Promise(function(t,f){
//   //   setTimeout(t,500,'resolve');
//   //   // setTimeout(f,500,'reject');
//   // });

//   // p.then(e=>console.log('then',e)).catch(e=>console.log('catch',e))

// console.log(o.next())


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

