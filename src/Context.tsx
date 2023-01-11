import { PaletteMode } from '@mui/material';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface Context {
  version: string;
  object: object | null;
  array: any[];
  mode: PaletteMode;
  setMode: Dispatch<SetStateAction<PaletteMode>>;
  isPrefersDarkMode: boolean;
  prefersMode: PaletteMode;
}

export const Context = createContext<Context|null>(null);

export default Context;
