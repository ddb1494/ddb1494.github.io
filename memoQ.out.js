(function (){

let sourceChars2=[];
let sourceChars=[];
let targetChars=[];

window.sourceChars2=sourceChars2
window.sourceChars=sourceChars
window.targetChars=targetChars

let o = $('#gridTableBody');

o.on('wheel',onCollect);

function onCollect(e){

    button.text(sourceChars.length + '/' + targetChars.length);

    o.find('.original-segment-grid').each(function(i,td){
        let k=$(td).parent().attr('data-id')
        let v=$(td).find('.content-container').html().replace(/[\r\n]/g,'')
        
        if(sourceChars[k]===undefined) {
            sourceChars[k]=v;
            console.log(k,v);
            
            let v2='';
            $(v).find('span').each((i,e)=>{
                let s
                s=$(e).unwrap();
                if($(e).is('.tag')){
                    s='<'+s+'>'
                }
                v2+=s;
            });
            sourceChars2[k]=v2;
        }
    });

    o.find('.translated-segment-grid').each(function(i,td){
        let k=$(td).parent().attr('data-id')
        let v=$(td).find('.content-container').html().replace(/[\r\n]/g,'')
        
        if(targetChars[k]===undefined) {
            targetChars[k]=v;
            console.log(k,v);
        }
    });


}


let button=$('<button>').appendTo('body');

button
.css({position:'fixed',right:0,top:0,padding:'2em',background:'#f00',color:'#ff0'})
.one('click',function(){
    // clearInterval(interval);
    o.off('wheel');
    let div=$('<div>').appendTo('body').css({
        posision:'fixed',left:0,top:0,
            width: '100%',
            height: '400px',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            background: '#000',
            color: '#000',
            textAlign: 'center'
    });
    $(this).appendTo(div).one('click',e=>{div.remove();this.remove();});
    let source2=$('<textarea>').val(sourceChars2.join('\n')).appendTo(div).attr('title',sourceChars2.length).css('height','100%');
    let source=$('<textarea>').val(sourceChars.join('\n')).appendTo(div).attr('title',sourceChars.length).css('height','100%');
    let target=$('<textarea>').val(targetChars.join('\n')).appendTo(div).attr('title',targetChars.length).css('height','100%');
}).text('stop');




})();


// $('#gridTableBody').on('DOMSubtreeModified',(e)=>{
//  console.log(e);
// });
