import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";
import { ImageCarousel } from "../components/ImageCarousel";
import { Link } from "react-router-dom";

export const GestionAlojamientosPage = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const { getAlojamientosByEmail } = useFirestore();
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    getAlojamientosByEmail(userEmail)
      .then((alojamientos) => {
        setAlojamientos(alojamientos);
      })
      .catch((e) => {
        console.error("Error obteniendo alojamientos de firestore", e);
      });
  }, []);

  return (
    <div>
      {alojamientos != 0 ? <h1>Mis alojamientos</h1> : <></>}
      <ul className="alojamientos">
        {alojamientos.length > 0 ? (
          alojamientos.map((alojamiento) => (
            <li className="alojamientos-item" key={alojamiento.id}>
              <ImageCarousel images={alojamiento.imgURL} />
              <h2>{alojamiento.nombre}</h2>
              <p>{alojamiento.descripcion}</p>
              <Link
                to={`/gestionarAlojamiento/${alojamiento.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                Modificar
              </Link>
            </li>
          ))
        ) : (
          <li>
            <h1>
              No existe ningún alojamiento gestionado por el usuario activo
            </h1>
          </li>
        )}
      </ul>
    </div>
  );
};
