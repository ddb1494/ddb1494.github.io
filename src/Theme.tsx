import { ReactNode, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

import { Context } from '@src/Context';

import useDarkMode from '@hook/useDarkMode';

import { colors } from '@mui/material';
const { pink, grey } = colors;

interface ThemeProps {
  children?: ReactNode;
}

const Theme = (props: ThemeProps) => {
  const { children } = props;
  const { prefersMode, mode, setMode, isPrefersDarkMode } = useDarkMode();
  // const isDarkMode = useMemo(() => mode === 'dark', [mode]);
  const colorDeep = useMemo(() => (mode === 'dark' ? '200' : '800'), [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // primary: {
          //   main: colors.lightBlue[colorDeep],
          // },
          // secondary: {
          //   main: colors.pink[colorDeep],
          // },
        },
        components: {
          MuiButton: {
            defaultProps: {
              variant: 'outlined',
            },
          },
        },
      }),
    [mode],
  );

  console.log('Inited Theme.tsx', theme.palette.mode, theme);

  return (
    <Context.Provider
      value={{
        version: '0.0.1',
        object: { a: 1, b: 2, c: 3 },
        array: ['1', '2', '3'],
        prefersMode,
        mode,
        setMode,
        isPrefersDarkMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export { Theme as default };
