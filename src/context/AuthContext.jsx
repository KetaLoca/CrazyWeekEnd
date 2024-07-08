import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState();
  const [userEmail, setUserEmail] = useState("Aún no se ha logueado");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLog = localStorage.getItem("isLogged");
    if (storedUser) {
      setUserEmail(JSON.parse(storedUser));
      setIsLogged(JSON.parse(storedLog));
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem("user", JSON.stringify(userEmail));
      localStorage.setItem("isLogged", JSON.stringify(isLogged));
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
