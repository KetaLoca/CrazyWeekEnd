import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Usuario autenticado correctamente");
      })
      .catch((error) => {
        console.log(error);
        alert("Error al iniciar sesión");
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Usuario registrado correctamente");
      })
      .catch((error) => {
        console.log(error);
        alert("Error al crear el usuario");
      });
  };

  return (
    <div>
      <h1>Autenticación</h1>
      <form>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button onClick={handleSignIn}>Iniciar sesión</button>
        <button onClick={handleSignUp}>Registrarse</button>
      </form>
    </div>
  );
};
