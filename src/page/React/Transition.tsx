import { Box, Button, CircularProgress } from "@mui/material";
import { useTransition, useState, startTransition as st } from "react";


const calc = () => {
  const now = Date.now();
  for (let i = 0; i < 3_000_000_000; i++) { }
  return Date.now() - now;
};

const acalc = async () => calc();

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
      setCount2(c => c + 1);
      acalc().then(console.log);
    });
  }

  function handleClick2() {
    setCount(c => c + 1);
    setCount2(c => c + 1);
    acalc().then(console.log);
  }


  return <Box>
    <h3>Transition</h3>

    <div>
      <Box height={'3rem'}>{isPending && 'pendding'}</Box>
      <Button onClick={handleClick}>{count}-{count2}</Button>
      <Button onClick={handleClick2}>{count}-{count2}</Button>
    </div>
  </Box>;
};

export default Page;
