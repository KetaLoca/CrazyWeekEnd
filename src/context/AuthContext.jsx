import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserEmail(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem("user", JSON.stringify(userEmail));
    } 
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, userEmail, setUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
