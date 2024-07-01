import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState("Aún no se ha logueado");

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, userEmail, setUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
