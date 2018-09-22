// 运行: chrome

// localforage 是一个可以简单操作localStorage, WebSQL, indexedDB 的模块
// 参考 https://github.com/localForage/localForage
// 参考 https://localforage.github.io/localForage/#multiple-instances-createinstance

// [准备] 导入库文件地址
// https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.2/localforage.min.js


{// 连接数据库
	{// 自定义连接数据库
		let db = localforage.createInstance({
			name: "dbName",			// 数据库名称
			//storeName:'objectStoreName',	// 存储对象名称
		});
	}

	{// 默认连接数据库
		let db = localforage;	// { name:'localforage', storeName:'keyvalepairs' }
	}
	
	{// 版本的升级
		// 假设当前版本为2
		localforage.createInstance({name:1, storeName:1});// 此时版本将内部升级为3
		localforage.createInstance({name:1, storeName:2});// 此时版本将内部升级为4
		localforage.createInstance({name:1, storeName:3});// 此时版本将内部升级为5
		// 因为创建新的ObjectStore时,必须借助onupgradeneeded事件来实现, 这个需要升级版本
		
		localforage.dropInstance({name:1, storeName:1});// 此时版本将内部升级为6
		localforage.dropInstance({name:1, storeName:2});// 此时版本将内部升级为7
		// 问题: 有时执行删除, 却不会被删除. 且之后的读写操作都将返回 {Promise <pending>}
	}
}


{// 打开配置 db.config(opt)
	// 提示: 对于indexedDB, 真正常用的就只有 name 和 storeName
	let opt={
		driver:[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAG],// 首选驱动顺序, 与setDriver上面传递的格式相同
		name:'localforage',	// 数据库的名称, 在localStorage中用于键的前缀
		size:4980736,		// 数据库字节大小, 仅用于WebSQL
		storeName:'keyvaluepairs',	// 数据存储的名称, IndexedDB中的objectStore名; WebSQL中的表名. (任何非字母数字字符都将转换为下划线)
		version:1.0,	// 数据库的版本, 仅用于WebSQL和IndexedDB, 在WebSQL中只是设置版本, 在IndexedDB中当触发onupgradeneeded事件时被调用.
		description:''	// 数据库的描述，基本上针对开发者的使用。
	}
	
	// 获取
	localforage.config();		// {name, storeName, ...}
	localforage.config('name');	// 获取name
	
}

{// 保存读取
	// indexedDB 只有异步, 没有同步
	let db=localforage.createInstance({ name:'1', storeName:'1' });
	
	// 增加删除
	db.setItem('k', 'v').then( v=>console.log(v) ).catch( err=>console.log(err) );	// 设置k键的值
	db.removeItem('k').then( ()=>{} ).catch( err=>console.log(err) );		// 删除k键的值
	
	// 批量操作
	db.clear().then( ()=>{} ).catch( err=>console.log(err) );			// 清空数据库所有键的值
	
	
	// 读取
	db.getItem('k').then( v=>console.log(v) ).catch( err=>console.log(err) );	// 获取k键的值 (已知键名时)
	db.keys().then( v=>console.log(v) ).catch( err=>console.log(err) );		// 获取所有键名的数组
	db.length().then( v=>console.log(v) ).catch( err=>console.log(err) );		// 获取所有键名的数量
	db.key(0).then( v=>console.log(v) ).catch( err=>console.log(err) );		// 获取k键的值 (未知键名, 用索引时)
	
	{// 遍历
		let collection=[];
		db.iterate( function (v,k,count){
			collection.push([k,v,count]);	// 将遍历结果插进去
			if(count>3) return '提前结束';	// 即便有更多的数据, 也可提前结束遍历, 反馈目前结果
		})
		.then(res=>console.log(res,collection))		// '提前结束'
		.catch(err=>console.log(err))
	}
}






// 案例, 在indexedDB中存取图片
<!DOCTYPE html>
<html>
<head>
    <title>localforage upload</title>
      <script src="https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.min.js"></script>
      <style>
        .button {border: 1px solid #ccc; background: #eee;padding:4px;border-radius: 4px; user-select:none; cursor:pointer;}
      </style>
</head>
<body>

<label for="inputfile-image" class="button">上传图片</label>
<input type="file" id="inputfile-image" accept="image/*" hidden> 

<article>
<h3>FileReader</h3>
<img id="filereader-image"></img>
</article>

<article>
<h3>ArrayBuffer</h3>
<img id="arraybuffer-image"></img>
</article>


<script>
console.log(localforage.driver());

// 选择标签
let ii=document.querySelector('#inputfile-image');
let fi=document.querySelector('#filereader-image');
let ai=document.querySelector('#arraybuffer-image');


// 选择图片文件
ii.onchange=function(e){
    let file=ii.files[0];
    console.log('[change]', file);
    let url=URL.createObjectURL(file);// url string
    fi.src=url;
    saveToLocalforage('inputfile-image',file);// file
}

// 将图片文件保存到数据库中
function saveToLocalforage(name,file){
    let _=localforage;
    _.setDriver(_.INDEXEDDB).then(()=>{
        _.setItem(name, file).then((file)=>{
            console.log('[save db]', file);
        });
    });
}

// 从数据库中读取图片文件并显示
function loadFromLocalforage(name){
    let _=localforage;
    _.setDriver(_.INDEXEDDB).then(()=>{
        _.getItem(name).then((file)=>{
            if(file){
                ai.src=URL.createObjectURL(file);
                console.log('[load db]', name, 'done');
            }else{
                console.log('[load db]', name, 'faild');
            }
        });
    });
}

loadFromLocalforage('inputfile-image');
</script>
</body>
</html>




