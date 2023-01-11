import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import chroma from 'chroma-js';
import { useMemo, useState } from 'react';

const Page = () => {
  const [color1, setColor1] = useState(chroma.random());
  const [color2, setColor2] = useState(chroma.random());
  const colorMix = chroma.mix(color1, color2);
  const [mode, setMode] = useState<chroma.InterpolationMode>('rgb');
  const modes: chroma.InterpolationMode[] = [
    'rgb',
    'hsl',
    'hsv',
    'hsi',
    'lab',
    'lch',
    'hcl',
    'lrgb',
  ];

  const scaleColors = chroma.scale([color1, color2]).mode(mode).colors(10);

  return (
    <Box>
      <ButtonGroup>
        {modes.map((v) => (
          <Button
            key={v}
            onClick={() => setMode(v)}
            variant={v === mode ? 'contained' : 'outlined'}
          >
            {v}
          </Button>
        ))}
      </ButtonGroup>
      <form>
        <Paper
          sx={{
            bgcolor: color1 as any,
            width: 32,
            height: 32,
            display: 'inline-block',
          }}
        />
        <TextField
          type="text"
          value={color1}
          onChange={(ev) => {
            setColor1(ev.target.value as any);
          }}
          sx={{ width: 100, input: { textAlign: 'center' } }}
        />
        <Paper
          sx={{
            bgcolor: color2 as any,
            width: 32,
            height: 32,
            display: 'inline-block',
          }}
        />
        <TextField
          type="text"
          value={color2}
          onChange={(ev) => {
            const v = ev.target.value;
            if (chroma.valid(v)) setColor2(v as any);
          }}
          sx={{ width: 100, input: { textAlign: 'center' } }}
        />
        <Tooltip title={<>colorMix</>}>
          <Paper
            sx={{
              bgcolor: colorMix as any,
              width: 32,
              height: 32,
              display: 'inline-block',
            }}
          />
        </Tooltip>
      </form>
      <Box>
        <Typography variant="h5" display="inline-block">
          hls
        </Typography>
        {scaleColors.map((color, i) => (
          <Tooltip title={color} key={`color-${i}-${color}`}>
            <>
              <Paper
                sx={{
                  bgcolor: color,
                  width: 32,
                  height: 32,
                  display: 'inline-block',
                }}
              />
            </>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Page;
