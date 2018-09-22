// 这是一个本地worker机制
// new Worker时, 会连网获取js文件. 即便已经访问过得js文件, 也会重新拿来.
// 这个模块可以设置主进程的worker和worker.js中worker的内容

// createLocaleWorker(mainHandles, workerHandles)
// @mainHandles, @workerHandles   可以是函数或对象, 函数时侦听为message, 对象时遍历侦听各个事件
// createLocaleWorker( main_onmessage, worker_onmessage )
// createLocaleWorker( {message:()=>{}, onerror:()=>{} }, worker_onmessage )





(function (w){
let _=function createLocaleWorker(mainHandles, workerHandles) {
	let code='', blob, url, worker;

	if(typeof workerHandles=='function'){
		code+='this.addEventListener(\'message\','+workerHandles.toString()+');';
	}else{
		let k,f;
		for(k in workerHandles) {
			f=workerHandles[k]
			k=k.replace(/^on(.+)/, '$1');	// 去掉开头的on
			code+='this.addEventListener(\''+k+'\','+f.toString()+');';
		}
	}


	if(code){
		if(!_.cache[code]){
			blob=new Blob([code], {type:'text/javascript'});
			url=URL.createObjectURL(blob);
			_.cache[code]=url;
		}else{
			url=_.cache[code];
		}
		worker=new Worker(url);
		if(typeof mainHandles=='function'){
			worker.addEventListener('message', mainHandles);
		}else{
			let k,f;
			for(k in mainHandles){
				f=mainHandles[k];
				k=k.replace(/^on(.+)/, '$1');	// 去掉开头的on
				worker.addEventListener(k, f);
			}
		}
	}
	return worker;
}
Object.defineProperty(_,'cache',{value:Object.create(null)});
w.createLocaleWorker=_;
})(window);


// w=createLocaleWorker((m)=>{console.log('main',m.data)}, (m)=>{console.log('worker',m.data)}); w.postMessage(1);
