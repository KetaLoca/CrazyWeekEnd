import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true

export function HomePage() {
  const { userEmail, setUserEmail, isLogged, setIsLogged } = useContext(AuthContext);
  const logOutButtonRef = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/users/auth")
      .then((e) => {
        setUserEmail(e.data)
        setIsLogged(true)
      })
      .catch((e) => {
        setIsLogged(false)
        return
      })
  }, [])

  function handleBuscarAlojamientos() {
    navigate("/alojamientos");
  }

  function handleMisReservas() {
    navigate("/reservations");
  }

  function handleCrearAlojamiento() {
    navigate("/crearAlojamiento");
  }

  function handleMisAlojamientos() {
    navigate("/gestionarAlojamientos");
  }

  function handleAccount() {
    navigate("/account");
  }

  async function handleLogOut(e) {
    e.preventDefault()
    logOutButtonRef.current.blur()

    if (!isLogged) {
      navigate("/auth")
      return
    }

    await axios.post('http://localhost:3000/users/logout', null)
      .then((response) => {
        if (response.status == 200) {
          setIsLogged(false)
          navigate("/auth")
        }
      })
      .catch((e) => {
        setIsLogged(false)
        navigate("/auth")
        return
      })
  }

  return (
    <div className="homeheader">
      <h1>CrazyWeekEnd</h1>
      <h2>
        Usuario logueado: <strong>{userEmail}</strong>
      </h2>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/crazyweekend570.appspot.com/o/LogoAPP.png?alt=media&token=d4152f65-fdcb-4fcd-8c07-329d13007905"
        alt="Logo de la aplicación"
      />
      <div className="switchbuttons">
        <button onClick={handleBuscarAlojamientos}>Buscar alojamientos</button>
        <button onClick={handleMisReservas}>Consultar mis reservas</button>
        <button onClick={handleCrearAlojamiento}>Añadir alojamiento</button>
        <button onClick={handleMisAlojamientos}>
          Gestionar mis alojamientos
        </button>
        <button onClick={handleAccount}>Mi cuenta</button>
        {isLogged ? (
          <button onClick={handleLogOut} ref={logOutButtonRef}>Cerrar sesión</button>
        ) : (
          <button style={{ backgroundColor: "red" }} onClick={handleLogOut} ref={logOutButtonRef}>
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}
