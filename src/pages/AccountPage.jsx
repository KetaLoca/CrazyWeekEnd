import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "../models/classes";
import { useFirestore } from "../hooks/useFirestore";

export function AccountPage() {
  const { userEmail } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const guardarButtonRef = useRef(null);
  const navigate = useNavigate();
  const { addUser, getUser } = useFirestore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 2400);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    getUser(userEmail)
      .then((user) => {
        setNombre(user.nombre);
        setApellidos(user.apellidos);
        setTelefono(user.telefono);
      })
      .catch((e) => {
        alert("No se encuentran datos asociados al usuario");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (userEmail == "Aún no se ha logueado") {
      setError("Para modificar su perfil debe iniciar sesión antes");
      return;
    }
    const user = new User(userEmail, nombre, apellidos, Number.parseInt(telefono));
    addUser(user)
      .then(() => {
        setError("Usuario modificado correctamente");
      })
      .catch((e) => {
        setError("Error añadiendo usuario");
      });
    guardarButtonRef.current.blur();
  }

  return (
    <>
      <h1>Modificar perfil</h1>
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <img
        className="accountimg"
        src="https://firebasestorage.googleapis.com/v0/b/crazyweekend570.appspot.com/o/LogoAPP.png?alt=media&token=d4152f65-fdcb-4fcd-8c07-329d13007905"
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
