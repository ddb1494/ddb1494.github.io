javascript: (function() {
    var str;
    var arr;
    var target;
    let replace=false;
    var div = $("<div>").css({
        position: "fixed",
        top: 0,
        width: "40%",
        right: 10,
        bottom: 10,
        border: "2px solid blue",
        padding: 24,
        background: "rgba(0,0,0,0.5)",
        zIndex: 99999999999
    }).appendTo("body");
    var msg = $("<h5>").text("붙여넣는 기능").css({
        "background": "rgba(255,255,255,0.9)",
        "font-weight": "bold"
    }).appendTo(div);
    var ok = $("<button>").text("확인").on("click",
    function() {
        str = ta.val().trim();
        arr = str.split("\n");
        ta.remove();
        ok.remove();

        msg.text("마우스 굴려서 입력").appendTo(div);
        $(document).on("DOMSubtreeModified", doWork);
        div.css({
            width: 200,
            height: 200,
            top: 0,
            right: 10
        })
    }).appendTo(div).css({zIndex:99999,background:'yellow'});
    var ng = $("<button>").text("취소").on("click",
    function() {
        div.remove();
        $(document).off("keydown", doWork)
    }).appendTo(div).css({zIndex:99999,background:'yellow'});
    div.append("<br>");
    var ta = $("<textarea>").appendTo(div).css({
        width: "100%",
        height: window.innerHeight / 2
    });

    let o=$('#gridTableBody');

    function doWork(e) {
        let length=arr.length;

        o.find('tr[data-id]').each((i,e)=>{
            let id=$(e).attr('data-id');
            let source=$('.original-segment-grid .editor-cell',e)
            let target=$('.translated-segment-grid .editor-cell',e)

            console.log(id)
            if(arr[id]!==undefined && arr[id].length>0) {

                if(target.text().length>0){
                    if(replace) {
                        target.text(arr[id]);
                        arr[id]=undefined;
                    }
                }

            }
        });
        var v = arr.shift();
        if (v) {
            $(e.target).html($("<p>").text(v));
            msg.text(length + "개 남음");
            if (length === 0) {
                msg.text("입력 완료").appendTo(div).css({
                    background: "rgba(0,255,0,0.2)"
                });
                $(document).off("keydown", doWork);
                setTimeout(function() {
                    div.remove()
                },
                1000)
            }
        }
    }
})();