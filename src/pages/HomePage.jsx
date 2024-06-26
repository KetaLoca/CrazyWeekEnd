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
    <>
      <header>
        <h1>Esta es la página de inicio</h1>
        <h2>{email}</h2>
        <br></br>
        <button onClick={handleLogOut}>Log out</button>
      </header>
    </>
  );
}
