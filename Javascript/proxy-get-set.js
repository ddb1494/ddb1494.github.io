// Proxy 代理并非侦听对象
{
    let o=[1,2,3,4] // 对象
    o.name='o';

    let p=new Proxy(o,{
        get(o,k,p){
            console.log('<get>', k,'===',o[k]);
            if(k==='toString') return function(){
              return 'ooo';
            }

            return o[k];
        },
        set(o,k,v,p){
            console.log('<set>', k,'=', v);
            o[k]=v;
        }
    })  // 代理对象

    // 以下操作对 proxy 没有任何反应, 因为并非侦听
    o.push(999)
    
    // a[1]=5
    // a.a='demo'
    // console.log(a)

    p.push(888)
    console.log(o)
    // 直接对proxy操作，才会影响a，这样的话，无法对push等进行侦听。

    // r=p[0]='value'
    // p.name;
    // p.name=1
    // p.name;

    // p.push(1)

    // console.log(p)



    

    // p.a=1
    // p.a

    // console.log(r)
    // console.log(p.toString())

}
