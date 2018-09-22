{// 获取一个元素(Element)的绝对位置
    function pos(elem){
        let x,y;
        x=elem.getBoundingClientRect().left+document.documentElement.scrollLeft;
        y=elem.getBoundingClientRect().top+document.documentElement.scrollTop;
        return {left:Math.round(x),top:Math.round(y)};
    }
}



