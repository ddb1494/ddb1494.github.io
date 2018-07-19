(function() {
    function addTip(v) {
        var div = document.createElement('div');
        div.textContent = v;
        div.style.background = '#eee';
        div.style.zIndex = 99999;
        document.body.insertAdjacentElement('afterbegin', div)
    };

    window.onkeydown = window.onkeypress = window.onkeyup = function(e) {
        /*e.stopImmediatePropagation();e.stopPropagation();*/
        e.preventDefault();
        var o = Object.assign({
            key: e.key,
            keyCode: e.keyCode
        },
        e);
        addTip('[' + e.type + '] ' + (e.ctrlKey ? 'CTRL+': '') + (e.shiftKey ? 'SHIFT+': '') + (e.altKey ? 'ALT+': '') + (e.metaKey ? 'META+': '') + e.key + '(keyCode:' + e.keyCode + ')(code:' + e.code + ')' + (e.repeat ? ('(charCode:)' + e.charCode) : '') + (e.which ? ('(which:' + e.which + ')') : '') + (e.repeat ? '(repeat)': ''));
        console.log(e.key, e.keyCode, e)
    };

    window.onmousedown = window.onclick = window.oncontextmenu = function(e) {
    	e.preventDefault();
    	addTip('[' + e.type + '] ' + (e.ctrlKey ? 'CTRL+': '') + (e.shiftKey ? 'SHIFT+': '') + (e.altKey ? 'ALT+': '') + (e.metaKey ? 'META+': '') + (e.which ? ('(which:' + e.which + ')') : '');
    	console.log(e);
    };

    addTip('开始侦听');
})();