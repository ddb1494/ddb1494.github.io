import { FormControl, FormControlProps } from '@mui/material';

export const MyFormControl = ({
  success,
  children,
  sx,
  ...otherProps
}: {
  success: boolean;
} & FormControlProps) => {
  return (
    <FormControl
      {...(success ? { sx: { ...sx, '& *': { color: 'success.main' } } } : {})}
      {...otherProps}
    >
      {children}
    </FormControl>
  );
};
