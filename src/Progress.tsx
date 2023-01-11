import useDarkMode from '@hook/useDarkMode';
import { CircularProgress, css, Stack } from '@mui/material';
import { Store } from '@src/Store';

const Progress = () => {
  const { mode } = useDarkMode();
  const { progressDisplay } = Store((s) => s);

  return (
    <Stack
      className="Progress-Mask"
      justifyContent="center"
      alignItems="center"
      css={css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: ${mode === 'dark'
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(0,0,0,0.05)'};
        user-select: none;
        z-index: 999999;
        transition: all 0.5s;
        ${progressDisplay ? '' : 'display: none;'}
      `}
    >
      <CircularProgress
        css={css`
          color: ${mode === 'dark' ? '#fff' : '#000'};
          opacity: 0.7;
        `}
      />
    </Stack>
  );
};

export default Progress;
