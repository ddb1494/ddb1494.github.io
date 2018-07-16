(function() {

let str, map, target, div, msg, ok, ng, ta, ui, input;

input=document.querySelector('#editorHiddenInput');

ui = $(`<div style="position:fixed; top:0; right:10px; width:40%; bottom:10px; border:2px solid blue; padding:24px; background:#0007; z-index: 99999;">
<h5 class="message" style="background:#fffc; font-weight:bold;">memoQ 위한 붙여넣는 기능입니다.</h5>
<button class="ok" style="text-align:center;background:#ff0;width:100px;height:30px;">확인</button>
<button class="ng" style="text-align:center;background:#ff0;width:100px;height:30px;">취소</button>
<textarea style="width:100%; height:80%;"></textarea>
</div>`).appendTo('body');

msg = ui.find('h5.message');
ok = ui.find('button.ok')
ng = ui.find('button.ng')
ta = ui.find('textarea')

ok.on('click', function() {
    str = ta.val();
    map = stringToMap(str);
    ta.remove();
    ok.remove();
    msg.text("마우스 링을 굴러 보세요. 취소할 수도 있습니다.");
    $(window).on('keyup', doFill);
    ui.css({width: 200, height: 200, top: 0, right: 10 });
});

ng = ng.on("click", function() {
    ui.remove();
    input.addEventListener('keyup', doFill);
});

function doFill(e) {
    let keyCode=e.keyCode;
    let fName='';
    if(keyCode===40||keyCode===38){
        // previousElementSibling
        // nextElementSibling

        fName= (keyCode===40?'next':'previous')+'ElementSibling';

        msg.textContent='남은 수: '+map.size+'개.';
        if(map.size) {
            // setTimeout(()=>{
                let active=document.querySelector('#gridTableBody tr.active');
                // active=active[fName]
                if(active){
                    let id=active.getAttribute('data-id');
                    if(map.has(id)){
                        console.log(id, map.get(id));
                        if(input){
                            let s=active.querySelector('.translated-segment-grid .content-container');
                            console.log(s);
                            s.textContent='';
                            input.value=map.get(id);
                            map.delete(id);
                        }
                    }     
                }
            // });
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

})();
