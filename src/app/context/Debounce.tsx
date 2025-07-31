'use client';
import { createContext, useState } from 'react';

export const debounceContext = createContext();

export const DebounceProvider = ({ children }) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  const debounce = (value, delay) => {
  let debounceTimeout: number | undefined;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  };


  return (
    <debounceContext.Provider value={{ debouncedValue, debounce }}>
      {children}
    </debounceContext.Provider>
  );
}