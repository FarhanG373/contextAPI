'use client'
import { createContext, useState } from 'react';

export const ThemeToggleContext = createContext();
export const ThemeToggleProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};