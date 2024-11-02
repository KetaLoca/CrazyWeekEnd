import React, { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
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

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Debe rellenar ambos campos")
      return
    }

    await axios.post('http://localhost:3000/users/login',
      {
        email: email,
        password: password
      }
    )
      .then((response) => {
        if (response.status == 200) {
          setUserEmail(email)
          setIsLogged(true)
          resetForm()
          navigate("/home")
        }
      })
      .catch((e) => {
        if (e.status == 400) {
          setError("Bad request, faltan datos")
          resetForm()
        }

        if (e.status == 401) {
          setError("Contraseña incorrecta")
          resetForm()
        }

        if (e.status == 404) {
          setError("El usuario no existe")
          resetForm()
        }
      })
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/authRegister")
  };

  return (
    <div className="authcontainer">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSignIn} className="loginform">
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
        <button type="submit" ref={signInButtonRef}>
          Iniciar sesión
        </button>
        <button ref={signUpButtonRef} onClick={handleSignUp}>
          Registrarse
        </button>
      </form>
    </div>
  );
};
