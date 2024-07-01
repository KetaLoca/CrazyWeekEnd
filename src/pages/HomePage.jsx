import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export function HomePage() {
  const { userEmail, isLogged, setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      alert("No puede acceder a esta página sin haber iniciado sesión");
      navigate("/auth");
    }
  }, []);

  function handleBuscarAlojamientos() {
    navigate("/search");
  }

  function handleMisReservas() {
    navigate("/reservations");
  }

  function handleAccount() {
    navigate("/account");
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        setIsLogged(false);
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
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <img src="src\assets\LogoAPP.png" alt="Logo de la aplicación" />
      <div className="switchbuttons">
        <button onClick={handleBuscarAlojamientos}>Buscar alojamientos</button>
        <button onClick={handleMisReservas}>Consultar mis reservas</button>
        <button onClick={handleAccount}>Mi cuenta</button>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </div>
    </div>
  );
}
