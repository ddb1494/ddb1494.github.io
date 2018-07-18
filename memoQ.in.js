// DOMAttrModified
// DOMAttributeNameChanged
// DOMCharacterDataModified
// DOMElementNameChanged
// DOMNodeInserted
// DOMNodeInsertedIntoDocument
// DOMNodeRemoved
// DOMNodeRemovedFromDocument
// DOMSubtreeModified
/*
<tbody id="gridTableBody">
<tr  data-id="0"  class style="display:table-row">
    <td class="order">1.</td>
    <td class="original-segment-grid">
        <div class="editor-cell-container" style="max-height:534px">
            <div class="editor-cell">
                <div class="asset-container"></div>
                <div class="content-container-wrapper">
                    <span class="content-container">
                        <span class=" editor-char  ">검투사의 가죽 장화</span></span></div></div>
    <td class="translated-segment-grid">
        <div class="editor-cell-container focused" style="max-height: 746px;">
            <div class="editor-cell">
                <div class="asset-container">
                    <div class="editor-cursor hidden" style="width: 0px; height: 15px; left: 0px; top: 0px;"></div></div>
                    <div class="content-container-wrapper">
                        <!-- 有两种可能性, 空的没有<span class="editor-char" /> -->
                        <span class="content-container"></span></div></div></div>
                        <span class="content-container"><span class=" editor-char  ">112341</span></span>


页面侦听wheel事件

如果array还有有效内容, 
    填充(#gridTableBody tr[data-id=?] .translated-segment-grid span.content-container)
    下的span.editor-char
*/

(function() {

let str, map, target, div, msg, ok, ng, ta, ui, input;

input=document.querySelector('#editorHiddenInput');

ui = $(`<div style="position:fixed; top:0; right:10px; width:40%; bottom:10px; border:2px solid blue; padding:24px; background:#0007; z-index: 99999;">
<h5 class="message" style="background:#fffc; font-weight:bold;">memoQ 위한 붙여넣는 기능입니다.</h5>
<button class="ok" style="text-align:center;background:#ff0">확인</button>
<button class="ng" style="text-align:center;background:#ff0">취소</button>
<textarea style="width:100%; height:80%;"></textarea><textarea id="ao-clip" style="display:hidden"></textarea>
</div>`).appendTo('body');

msg = ui.find('h5.message');
ok = ui.find('button.ok')
ng = ui.find('button.ng')
ta = ui.find('textarea')
clip=ui.find('#ao-clip')

ok.on('click', function() {
    str = ta.val();
    map = stringToMap(str);
    ta.remove();
    ok.remove();
    msg.text("첫번째 칸에서 위 방향키를 누르시면 삽입이 시작됩니다. 첫 삽입이 완료되면 아래 방향키로 계속해 주세요.");
    $(window).on('keyup', doFill);
    ui.css({width: 200, height: 200, top: 0, right: 10 });
});

ng = ng.on("click", function() {
    ui.remove();
    input.addEventListener('keyup', doFill);
});

function doFill(e) {
    if(e.keyCode===40||e.keyCode===38){
        msg.textContent='남은 수: '+map.size+'개.';
        if(map.size) {
            setTimeout(()=>{
                let active=document.querySelector('#gridTableBody tr.active');
                if(active){
                    let id=active.getAttribute('data-id');
                    if(map.has(id)){
                        console.log(id, map.get(id));
                        if(input){
                            let s=active.querySelector('.translated-segment-grid .content-container');
                            console.log(s);
                            s.textContent='';
                            input.value=map.get(id);
//                             clip.value=map.get(id);
//                             clip.select();
//                             document.execCommand('copy');
//                             $(input).focus().trigger({type:'keydown',keyCode:86,witch:86,key:'v',code:'KeyV',ctrlKey:true});
//                             document.execCommand('paste');
                            map.delete(id);
                        }
                    }     
                }
                console.log(active);
            });
        }else{
            msg.text("입력 완료.").css({
                background: "rgba(0,255,0,0.2)"
            });
            $(window).off("keyup", doFill);
            setTimeout(function() { ui.remove(); },1000);
        }
    }
}

function stringToMap(str){
    let map=new Map();
    str.split('\n').forEach((v,i)=>{
        v=v.trim();
        if(v.length>0) map.set(String(i), v);
    });
    return map;
}

// function fill(id, value) {
//     let t,c,i;
//     t=document.querySelector('#gridTableBody tr[data-id="'+id+'"] .translated-segment-grid span.content-container');
//     c=t.querySelector('span.editor-char');
//     if(c===null) {
//         c=document.createElement('span');
//         x.classList('editor-char');
//         t.appendChild(c);
//     }
//     c.textContent=value;
//     c.style.background='#ccc';
    
//     let e=new Event('keyup');
//     e.keyCode=13;
//     e.ctrlKey=true;
//     e.shiftKey=false;
//     e.altKey=false;
//     e.metaKey=false;
//     t.dispatchEvent(e);
// }


// $(window).on('keydow', e=>console.log(e.type))

// function getRows() {
//     let rows;
//     rows=document.querySelectorAll('#gridTableBody tr[data-id]');
//     return rows;
// }


})();

// 免费计数器
$('<img>').appendTo('body')
   .attr('src','http://www.reliablecounter.com/count.php?page=https://github.com/ddb1494/ddb1494.github.io/blob/master/memoQ.in.js&digit=style/plain/29/&reloads=0')
   .css({position:'fixed',left:0,bottom:0,zIndex:999})
