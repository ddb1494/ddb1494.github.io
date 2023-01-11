export { };

addEventListener('message', (ev: MessageEvent) => {
  const { data } = ev;
  console.log('worker', ev);

  const view = new Uint8Array(data);
  view[0] = 11;

  postMessage({ ok:false, pending: true, data: null });

  setTimeout(()=>{
    postMessage({ ok:true, data: view.buffer }, { transfer: [view.buffer ]});
  }, 500);


});

