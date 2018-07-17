{

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

   function getWebContent(id, start, end, callback){
        let argLen=arguments.length;
        if(argLen===3) {
            callback=end;
            end=start;
            start=0
        }else if(argLen!==4){
            throw new Error('arguments length.');
        }

        let url=MQ.getAppRootUrl()+'api/TranslationService/GetWebContent';
        let data={"DocInstanceId":id,
        "RowIndicies":createArrayRange(start,end)}

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
        // 实例：
        // f(1,5)  // [1,2,3,4,5]
        // f(5,7)  // [5,6,7]
        // f(3)    // [0,1,2,3]

    }

    let id=prompt('DocInstanceId');
    if(id){
        getWebContent(id,0,prompt('count'),function(data){
            let success=data.success, rows=data.Value.Rows, res;
            if(success && rows){
                res=rows.map(row=>{
                    return row.Row.SourceSegment.EditorString;
                })
            }
            console.log(res);
        });
    }

}

// (function (){

// let sourceChars2=[];
// let sourceChars=[];
// let targetChars=[];

// window.sourceChars2=sourceChars2
// window.sourceChars=sourceChars
// window.targetChars=targetChars

// let o = $('#gridTableBody');

// o.on('wheel',onCollect);

// function onCollect(e){

//     button.text(sourceChars.length + '/' + targetChars.length);

//     o.find('.original-segment-grid').each(function(i,td){
//         let k=$(td).parent().attr('data-id')
//         let v=$(td).find('.content-container').html().replace(/[\r\n]/g,'')
        
//         if(sourceChars[k]===undefined) {
//             sourceChars[k]=v;
//             console.log(k,v);
            
//             let v2='';
//             $(v).find('span').each((i,e)=>{
//                 let s
//                 s=$(e).unwrap();
//                 if($(e).is('.tag')){
//                     s='<'+s+'>'
//                 }
//                 v2+=s;
//             });
//             sourceChars2[k]=v2;
//         }
//     });

//     o.find('.translated-segment-grid').each(function(i,td){
//         let k=$(td).parent().attr('data-id')
//         let v=$(td).find('.content-container').html().replace(/[\r\n]/g,'')
        
//         if(targetChars[k]===undefined) {
//             targetChars[k]=v;
//             console.log(k,v);
//         }
//     });


// }


// let button=$('<button>').appendTo('body');

// button
// .css({position:'fixed',right:0,top:0,padding:'2em',background:'#f00',color:'#ff0'})
// .one('click',function(){
//     // clearInterval(interval);
//     o.off('wheel');
//     let div=$('<div>').appendTo('body').css({
//         posision:'fixed',left:0,top:0,
//             width: '100%',
//             height: '400px',
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             zIndex: 999,
//             background: '#000',
//             color: '#000',
//             textAlign: 'center'
//     });
//     $(this).appendTo(div).one('click',e=>{div.remove();this.remove();});
//     let source2=$('<textarea>').val(sourceChars2.join('\n')).appendTo(div).attr('title',sourceChars2.length).css('height','100%');
//     let source=$('<textarea>').val(sourceChars.join('\n')).appendTo(div).attr('title',sourceChars.length).css('height','100%');
//     let target=$('<textarea>').val(targetChars.join('\n')).appendTo(div).attr('title',targetChars.length).css('height','100%');
// }).text('stop');




// })();


// // $('#gridTableBody').on('DOMSubtreeModified',(e)=>{
// //  console.log(e);
// // });
