// 免费计数器

{
   let rows=[
       ['[[진] 빛나는 대영주의 부츠 상자','[[真]闪耀的大领主之靴宝箱'],
       ['[[진] 빛나는 대영주의 코트 상자','[[真]闪耀的大领主大衣宝箱'],
   ];

   function createArrayRange(start,end){
        if(end===undefined) {
            end=start;
            start=0;
        }
        let res=[];
        while(start<=end){
            res.push(start++);
        }
        return res;
    }

   function saveWebRows(id, rows, callback){
        rows=rows.map((e,i)=>{
            let o = {
                DocInstanceId:id,
                id:i,
                comments:[],
                locked:false,
                rangeForCorrectedLQA:null,
                // sourceSegmentHtml:e[0],
                // sourceSegmentChanges:[],
                // targetSegmentChanges:[],
                // targetSegmentHtml:e[1],
                translationState:1,
                warnings:[],
                webLQAErrors:[]
            };

            let type=typeof e;
            if(type==='string'){
                o.targetSegmentHtml=e;
            }else if(Array.isArray(e)){
                if(e.length>1) {
                    o.sourceSegmentHtml=e[0];
                    o.targetSegmentHtml=e[1];
                }else{
                    o.targetSegmentHtml=e[0];
                }
            }
            console.log(type, e)
            return o;
        });
        let url  = MQ.getAppRootUrl()+'api/TranslationService/SaveWebRows';
        let data = { DocInstanceId:id, WebRows:rows };


        // {"DocInstanceId":"96e71dad-9dbc-40fb-9a3c-11c42fe04811",
        // "WebRows":[{"docInstanceId":"96e71dad-9dbc-40fb-9a3c-11c42fe04811","id":0,"sourceSegmentHtml":"[[진] 빛나는 대영주의 부츠 상자1","targetSegmentHtml":"11211","locked":false,"translationState":2,"warnings":[],"webLQAErrors":[],"comments":[],"rangeForCorrectedLQA":null,"sourceSegmentChanges":[],"targetSegmentChanges":[]}]}

        let headers={
            'accept':'*/*',
            'content-type':'application/json; charset=UTF-8',
            // 'x-xsrf-token':document.cookie.match(/X-XSRF-TOKEN=(.+);?/)[1]
            'x-xsrf-token':MQ.getCookieValue('X-XSRF-TOKEN')
        };

        function success(data){
            if(typeof callback==='function') {
                callback(data);
            }else{
                console.log(data);
            }
        }

        $.ajax({
          type: "POST",
          data: JSON.stringify(data),
          // dataType: '*/*',
          headers, url, success
        });
    }

    let id=WebTrans.Doc.docInstanceId;
    if(id){
        saveWebRows(id,rows,function(data){
            let success=data.Success, res;
            if(success){
                console.log(success,data);
            }
        });
    }
}



