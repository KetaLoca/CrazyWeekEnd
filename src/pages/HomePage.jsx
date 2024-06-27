import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export function HomePage() {
  const email = auth.currentUser.email;
  const navigate = useNavigate();

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        alert("Sesión cerrada correctamente");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Error cerrando sesión");
      });
  }

  return (
    <div className="homeheader">
      <h1>CrazyWeekEnd</h1>
      <h2>
        Usuario logueado: <strong>{email}</strong>
      </h2>
      <img src="src\assets\LogoAPP.png" alt="Logo de la aplicación" />
      <div className="switchbuttons">
        <button>Buscar alojamientos</button>
        <button>Consultar mis reservas</button>
        <button>Mi cuenta</button>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </div>
    </div>
  );
}
