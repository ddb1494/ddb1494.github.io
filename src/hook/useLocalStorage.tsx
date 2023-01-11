import { useEffect, useState, SetStateAction, createContext } from 'react';

export const LocalStorageContext = createContext<any>({});

function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
): [T, (v: T | SetStateAction<T>) => any] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return defaultValue;
  });

  useEffect(() => {
    // console.log('effect', key, value, defaultValue);
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, setValue]);

  return [value, setValue];
}

export default useLocalStorage;
