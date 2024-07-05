import React, { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export const ReservaElement = ({ reserva }) => {
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento } = useFirestore();

  useEffect(() => {
    if (reserva) {
      getAlojamiento(reserva.idalojamiento)
        .then((result) => {
          setAlojamiento(result);
          console.log(result);
        })
        .catch((e) => {
          alert("Error recuperando el alojamiento");
        });
    }
  }, [reserva]);

  return (
    <>
      <h1>{alojamiento ? alojamiento.nombre : "Nombre no disponible"}</h1>
      <img
        src={alojamiento ? alojamiento.imgURL : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
        alt="Foto portada alojamiento"
      />
      <p>
        {alojamiento ? alojamiento.descripcion : "Descripción no disponible"}
      </p>
    </>
  );
};
