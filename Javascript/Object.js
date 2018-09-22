// 学习Object



{// 用变量来定义键值
  let k='key', v='value';
  let o={ [k] : v };
  
  console.log(o); // { key: 'value' }
}



{// get, set 函数
	let o={
		w: 4,
		h:3,
		area(){
			return this.w*this.h;
		},
		get description(){
			return '长度为'+this.w+', 宽度为'+this.h+', 面积为'+this.area();
		}
	}

	console.log(o.w);			// 4
	console.log(o.h);			// 3
	console.log(o.area());		// 12
	console.log(o.description);	// 长度为4, 宽度为3, 面积为12
}



