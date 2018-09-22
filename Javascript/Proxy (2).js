// Proxy 代理并非侦听对象
{
    let o=[1,2,3] // 对象

    let p=new Proxy(o,{
        get(o,k){
            console.log('proxy get', k, o[k])
            return o[k];
        },
        set(o,k,v){
            console.log('proxy set', o,k,v)
            o[k]=v;
        }
    })  // 代理对象

    // 以下操作对 proxy 没有任何反应, 因为并非侦听
    // a.push(4)
    // a[1]=5
    // a.a='demo'
    // console.log(a)


    // 直接对proxy操作，才会影响a，这样的话，无法对push等进行侦听。
    let r
    r=p[0]='value'
    p.a=1
    p.a

    console.log(r)

}
