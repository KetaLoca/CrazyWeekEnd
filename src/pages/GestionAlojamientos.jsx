import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";
import { ImageCarousel } from "../components/ImageCarousel";

export const GestionAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const { getAlojamientosByEmail } = useFirestore();
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    getAlojamientosByEmail(userEmail)
      .then((alojamientos) => {
        setAlojamientos(alojamientos);
        console.log(alojamientos);
      })
      .catch((e) => {
        console.error("Error obteniendo alojamientos de firestore", e);
      });
  }, []);

  return (
    <div>
      <ul className="alojamientos">
        {alojamientos.length > 0 ? (
          alojamientos.map((alojamiento) => (
            <li className="alojamientos-item" key={alojamiento.id}>
              <h1>{alojamiento.nombre}</h1>
              <ImageCarousel images={alojamiento.imgURL} />
              <h3>{alojamiento.descripcion}</h3>
            </li>
          ))
        ) : (
          <li>
            <h1>
              No existen alojamientos gestionados por el usuario por el momento
            </h1>
          </li>
        )}
      </ul>
    </div>
  );
};
