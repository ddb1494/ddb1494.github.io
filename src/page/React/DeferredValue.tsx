import { Box, TextField } from "@mui/material";
import { useState, useDeferredValue, useMemo, ChangeEvent } from "react";


const calc = () => {
  const now = Date.now();
  for (let i = 0; i < 3_000_000_000; i++) { }
  return Date.now() - now;
};

const acalc = async () => calc();


const Page = () => {
  const [text, setText] = useState('');
  const searchText = useDeferredValue(text);
  const result = useMemo(() => {
    console.log('result');
    return `memo: ${searchText}`;

  }, [searchText]);
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  return <Box m={1} p={4} border={'1px solid #ccc'}>
    <Box component="h3" pb={2}>DeferredValue</Box>

    <Box p={2}>
      <TextField type="text" onChange={onChange} />

      <Box>{result}</Box>
      <Box>{text.length}</Box>
    </Box>

    <Box whiteSpace="break-spaces">{`
      useMemo( () => memo,
        [ useDeferredValue( [ state ] = useState() ) ] )
    `}</Box>
  </Box>;
};

Page.displayName = 'DeferredValue';

export default Page;
