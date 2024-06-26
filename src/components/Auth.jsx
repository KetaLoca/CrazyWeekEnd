import React, { useRef, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passworfRef = useRef(null);
  const signInButtonRef = useRef(null);
  const signUpButtonRef = useRef(null);

  function resetForm() {
    setEmail("");
    setPassword("");
    signInButtonRef.current.blur();
    signUpButtonRef.current.blur();
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Usuario autenticado correctamente");
        resetForm()
      })
      .catch((error) => {
        console.log(error);
        alert("Error al iniciar sesión");
        resetForm();
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Usuario registrado correctamente");
        resetForm()
      })
      .catch((error) => {
        console.log(error);
        alert("Error al crear el usuario");
        resetForm();
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
        <button ref={signInButtonRef} onClick={handleSignIn}>
          Iniciar sesión
        </button>
        <button ref={signUpButtonRef} onClick={handleSignUp}>
          Registrarse
        </button>
      </form>
    </div>
  );
};
