import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function AccountPage() {
  const { userEmail, isLogged } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const guardarButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      alert("No puede acceder a esta página sin haber iniciado sesión");
      navigate("/auth");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    guardarButtonRef.current.blur();
  }

  return (
    <>
      <h1>Mi cuenta</h1>
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <img
        className="accountimg"
        src="src\assets\LogoAPP.png"
        alt="Logo de la aplicación"
      />
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
        <button type="submit" onClick={handleSubmit} ref={guardarButtonRef}>
          Guardar
        </button>
      </form>
      <p id="accounterror">{error}</p>
    </>
  );
}
