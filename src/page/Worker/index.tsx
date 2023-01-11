import { Box, Button } from "@mui/material";
import { useCallback, useInsertionEffect, useRef, useState } from "react";


import MyWorker from './worker?worker';


const useHook = () => {
  const ref = useRef<HTMLHeadingElement>(null);

  const [boo, setBoo] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<any>();

  const refresh = useCallback(() => setBoo(!boo), [boo, setBoo]);
  useInsertionEffect(() => {
    console.log('insertion effect');

    const w = new MyWorker();
    const v = new Uint8Array([1, 2, 3]).buffer;
    w.postMessage(v, { transfer: [v] });
    w.addEventListener('message', (ev: MessageEvent) => {
      const { ok, pending, data } = ev.data;
      setPending(pending);

      if (ok) setResult(Array.from(new Uint8Array(data)));

      console.log('main', new Uint8Array(data));
    });

    return () => w.terminate();
  }, []);

  return { ref, refresh, pending, result };
};


const Page = () => {
  const { ref, refresh, pending, result } = useHook();

  return <Box>
    <h3 ref={ref}>Worker</h3>
    <Button onClick={refresh}>refresh</Button>
    <Box>{pending ? 'pending...' : JSON.stringify(result)}</Box>
  </Box>;
};

Page.displayName = 'Worker';

export default Page;
