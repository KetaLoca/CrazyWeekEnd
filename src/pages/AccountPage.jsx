import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function AccountPage() {
  const { userEmail } = useContext(AuthContext);
  return (
    <>
      <h1>Mi cuenta</h1>
      
      <img className="accountimg" src="src\assets\LogoAPP.png" alt="Logo de la aplicación" />
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <form className="perfilform">
        <label>Nombre</label>
        <input type="text" placeholder="Escriba su nombre" />
        <label>Apellidos</label>
        <input type="text" placeholder="Escriba sus apellidos" />
        <label>Teléfono</label>
        <input type="text" placeholder="Escriba su número" />
        <button type="submit">Guardar</button>
      </form>
    </>
  );
}
