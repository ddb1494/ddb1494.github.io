import { PaletteMode } from '@mui/material';
import { useState, useEffect } from 'react';

const MODE_DARK = 'dark';
const MODE_LIGHT = 'light';



export const isPrefersDarkMode = (): boolean =>
  window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
export const getPrefersMode = (): PaletteMode => {
  return isPrefersDarkMode() ? MODE_DARK : MODE_LIGHT;
};

type IMode = PaletteMode;
type ISetMode = (v: any) => void;

export const usePrefersColorScheme = (): [IMode, ISetMode] => {
  const [mode, setMode] = useState(getPrefersMode());

  useEffect(() => {
    window
      ?.matchMedia('(prefers-color-scheme: dark)')
      ?.addEventListener('change', (event) => {
        const mode = event.matches ? MODE_DARK : MODE_LIGHT;
        setMode(mode);
      });
  }, []);

  return [mode, setMode];
};

export default usePrefersColorScheme;
