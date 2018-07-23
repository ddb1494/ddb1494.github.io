{// domain start


function MemoQ(){
    if(!(this instanceof MemoQ))new MemoQ();

    this.id           = WebTrans.Doc.docInstanceId;
    this.length       = WebTrans.Core.numberOfRows;
    this.divisionGuid = WebTrans.Core.docJobGuid;
    this.projectId    =  MQ.getQueryString('prj');
    this.documentId   = MQ.getQueryString('doc');
    this.root         = MQ.getAppRootUrl();
}
MemoQ.prototype.ajax = function (url,data,callback){
    let headers;
    url = MQ.getAppRootUrl()+url;
    headers={
        'accept':'*/*',
        'content-type':'application/json; charset=UTF-8',
        // 'x-xsrf-token':document.cookie.match(/X-XSRF-TOKEN=(.+);?/)[1]
        'x-xsrf-token':MQ.getCookieValue('X-XSRF-TOKEN')
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      // dataType: '*/*',
      headers, url, success:callback
    });
};

MemoQ.prototype.getRows = function(callback) {
    let o = {
        DocInstanceId: WebTrans.Doc.docInstanceId,
        RowIndicies: MemoQ.createArrayRange(0,this.length)
    };
    this.ajax('api/TranslationService/GetWebContent', o, (data)=>{
        if(data.Success && data.Value && data.Value.Rows){
            let rows=data.Value.Rows, res=[];
            for(let row of rows) {
                row=row.Row;
                res.push({
                    id:  row.Id,
                    source: row.SourceSegment.EditorString,
                    target: row.TargetSegment.EditorString
                });
            }
            callback(res);
        }
    });
};

MemoQ.createArrayRange = function createArrayRange(start,end){
    if(end===undefined) {
        end=start;
        start=0;
    }
    let res=[];
    while(start<=end){
        res.push(start++);
    }
    return res;
};

MemoQ.prototype.setRows = function(rows, callback){
    let id=WebTrans.Doc.docInstanceId;
    rows=rows.map((e,i)=>{
        let o = {
            DocInstanceId: id,
            id: e.id,
            comments:[],
            locked:false,
            rangeForCorrectedLQA:null,
            sourceSegmentHtml:e.source,
            sourceSegmentChanges:[],
            targetSegmentChanges:[],
            targetSegmentHtml:e.target,
            translationState:2,
            warnings:[],
            webLQAErrors:[]
        };
        return o;
    });
    let url  = MQ.getAppRootUrl()+'api/TranslationService/SaveWebRows';
    let data = { DocInstanceId:id, WebRows:rows };

    this.ajax('api/TranslationService/SaveWebRows', data, callback);
};

function View(memoQ){
    $('#ao-mask').remove();
    this.memoQ=memoQ;
    let height=screen.availHeight;
    let html=`<div id="ao-mask">
<style>
#ao-mask{
    margin:0; padding:0;
    width:100%; height:100%;
    background:#000e;
    position:fixed; top:0; left:0;
    z-index:999;
    overflow: auto;
}
#ao-mask table {
    max-width:80%;
    background:#fff;
    margin:0 auto;
}
#ao-mask td{
    min-width:1em;
    min-height:1em;
    vertical-align: top;
    border: 1px solid #ccc;
    color: #000;
}
#ao-mask tr:hover{
    background:#ff07;
}
#ao-preview td{
    padding: .5em;
}
#ao-preview tr:even {
    background:#00f3;
}
#ao-mask textarea{
    height:200px;
    resize:none;
}
#ao-mask button {
    width:4em;
    height:2em;
    background: #5f6;
}
#ao-mask #ao-edit .target {
    user-modify: read-write-plaintext-only;
    -webkit-user-modify: read-write-plaintext-only;
}
</style>
<table>
    <tbody id="ao-menu">
        <tr>
            <td></td>
            <td>
                <button name="close">close</button>
            </td>
            <td>
                <button name="save">save</button>
            </td>
        </tr>
    </tbody>
    <tbody id="ao-edit">
        <tr>
            <td class="no">1</td>
            <td class="source"><textarea readonly></textarea></td>
            <td class="target"><textarea></textarea></td>
        </tr>
    </tbody>
    <tbody id="ao-preview">
    </tbody>
</table>
</div>`;
    let c=this.content=$(html).appendTo('body');
    c.find('button[name="close"]').one('click',()=>{
        c.remove();
    });
    c.find('button[name="save"]').one('click',()=>{
        let rows=[];
        c.find('#ao-preview tr').each((i,e)=>{
            e=$(e);
            let o={
                id: e.attr('id'),
                source: e.find('.source').text(),
                target: e.find('.target').text()
            }
            if(o.target.length) rows.push(o);
        })
        if(rows.length){
            this.memoQ.setRows(rows, (data)=>{

                if(data.Success) {
                    c.remove();
                    location.reload()
                }else{
                    alert('원인 불명의 에러가 발생 하였습니다.');
                    console.log(data);
                }
            });
        }else{
            alert('번역문이 전부 비어 있습니다')
        }
    });
    c.find('#ao-edit .target textarea').on('change', function(e){
        let text=e.target.value;
        text.split('\n').forEach((t,i)=>{
            c.find(`#ao-preview tr[id=${i}] .target`).text(t);
        });
    })
}

View.prototype.from=function(rows) {
    let c=this.content, ta=c.find('#ao-edit .target textarea');
    let trs=rows.map(row=>{
        return $('<tr>').attr('id', row.id)
        .append($('<td class="no">').text(row.id+1))
        .append($('<td class="source">').text(row.source))
        .append($('<td class="target" contenteditable="plaintext-only">').text(row.target).on('keydown',function(e){
            if(e.keyCode===13){
                e.preventDefault();
            }
        }).on('input',function(e){
            let tar=$(e.target), text=tar.text(), id=tar.parent().attr('id'), a=ta.val().split('\n');
            a[id]=text;
            ta.val(a.join('\n'));
            console.log(e)
        }));
    });

    let sources=rows.map(row=>row.source);
    let targets=rows.map(row=>row.target);

    this.content.find('#ao-preview').empty().append(trs);

    this.content.find('#ao-edit .source textarea').val(sources.join('\n'));
    this.content.find('#ao-edit .target textarea').val(targets.join('\n'));
}

var mq=new MemoQ;
var v=new View(mq);
mq.getRows(e=>{
    v.from(e);
});

}// domain end