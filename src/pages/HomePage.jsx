import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export function HomePage() {
  const [email, setEmail] = useState("Email no encontrado, debe loguearse");
  const navigate = useNavigate();
  const context = useContext(AuthContext)
  const { isLogged, setIsLogged, userEmail, setUserEmail } = context;

  function handleAccount() {
    navigate("/account");
  }

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
        <button onClick={handleAccount}>Mi cuenta</button>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </div>
    </div>
  );
}
