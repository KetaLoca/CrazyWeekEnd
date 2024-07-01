import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function AccountPage() {
  const { userEmail } = useContext(AuthContext);
  return (
    <>
      <h1>Mi cuenta</h1>
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <img src="src\assets\LogoAPP.png" alt="Logo de la aplicación" />
    </>
  );
}
