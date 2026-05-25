import React, { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage"; 

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}