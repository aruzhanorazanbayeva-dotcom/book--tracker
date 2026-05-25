import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage"; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isAuth, setIsAuth] = useLocalStorage("auth", false);

 
  const login = () => {
    setIsAuth(true); 
  };

  
  const logout = () => {
    setIsAuth(false); 
    localStorage.removeItem("user"); 
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}