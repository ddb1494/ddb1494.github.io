// import create from "zustand/react";
import zustand from 'zustand';

interface Store {
  progressDisplay: boolean;
  value: any;
  setValue: (v: any) => void;
}


export const Store = zustand<Store>((set, get) => ({
  progressDisplay: false,
  value: 'store-value',
  setValue: (value) => { set({ value }); },
}));


