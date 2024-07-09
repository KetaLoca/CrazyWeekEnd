import React, { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const { setUserEmail, setIsLogged } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signInButtonRef = useRef(null);
  const signUpButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 2400);
    return () => clearTimeout(timer);
  }, [error]);

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
        setUserEmail(email);
        setIsLogged(true);
        resetForm();
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setError("Error al iniciar sesión");
        resetForm();
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Usuario registrado correctamente");
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        setError("Error al registrar el usuario");
        resetForm();
      });
  };

  return (
    <div className="authcontainer">
      <h1>Autenticación</h1>
      <form id="loginform">
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
        <p>{error}</p>
        <button type="submit" ref={signInButtonRef} onClick={handleSignIn}>
          Iniciar sesión
        </button>
        <button ref={signUpButtonRef} onClick={handleSignUp}>
          Registrarse
        </button>
      </form>
    </div>
  );
};
