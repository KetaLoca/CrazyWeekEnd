import React, { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export function ReservaElement(reserva) {
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento } = useFirestore();

  useEffect(() => {
    getAlojamiento(reserva.idalojamiento)
      .then((it) => {
        setAlojamiento(it);
      })
      .catch((e) => {
        console.log("Error al recuperar alojamiento");
      });
    console.log(alojamiento);
  }, [reserva]);

  return (
    <>
      <h1>{alojamiento.nombre}</h1>
      <img src={alojamiento.imgURL} alt="Foto portada alojamiento" />
      <p>{alojamiento.descripcion}</p>
    </>
  );
}
