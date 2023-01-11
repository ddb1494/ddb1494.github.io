import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useMediaQuery } from '@mui/material';
import { PaletteMode } from '@mui/material';

export const MODE_DARK = 'dark';
export const MODE_LIGHT = 'light';

interface IReturn {
  mode: PaletteMode;
  setMode: Dispatch<SetStateAction<PaletteMode>>;
  isDarkMode: boolean;
  isPrefersDarkMode: boolean;
  prefersMode: PaletteMode;
}

export const useDarkMode = (): IReturn => {
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersMode = useMemo(
    () => (isPrefersDarkMode ? MODE_DARK : MODE_LIGHT),
    [isPrefersDarkMode],
  );
  const [mode, setMode] = useState<PaletteMode>(prefersMode);
  const isDarkMode = useMemo(() => mode === 'dark', [mode, setMode]);

  useEffect(() => {
    window
      ?.matchMedia('(prefers-color-scheme: dark)')
      ?.addEventListener('change', (event) =>
        setMode(event.matches ? MODE_DARK : MODE_LIGHT),
      );
  }, []);

  return {
    mode,
    setMode,
    isDarkMode,
    isPrefersDarkMode,
    prefersMode,
  };
};

export default useDarkMode;
