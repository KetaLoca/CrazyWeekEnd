import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function AccountPage() {
  const { userEmail } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  function handleNombre() {}

  function handleApellidos() {}

  function handleTelefono() {}

  return (
    <>
      <h1>Mi cuenta</h1>
      <img
        className="accountimg"
        src="src\assets\LogoAPP.png"
        alt="Logo de la aplicación"
      />
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <form className="perfilform">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escriba su nombre"
        />
        <label>Apellidos</label>
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Escriba sus apellidos"
        />
        <label>Teléfono</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Escriba su número"
        />
        <button type="submit">Guardar</button>
      </form>
    </>
  );
}
