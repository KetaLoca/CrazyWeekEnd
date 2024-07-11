import React, { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./ImageCarousel";

export const ReservaElement = ({ reserva }) => {
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento } = useFirestore();

  useEffect(() => {
    getAlojamiento(reserva.idalojamiento)
      .then((result) => {
        setAlojamiento(result);
      })
      .catch((e) => {
        console.log("Error recuperando el alojamiento");
      });
  }, [reserva]);

  return (
    <>
      <h1>{alojamiento ? alojamiento.nombre : "Nombre no disponible"}</h1>
      {alojamiento ? (
        <ImageCarousel images={alojamiento.imgURL} />
      ) : (
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
          }
          alt="Foto portada alojamiento"
        />
      )}
      <p>{reserva ? reserva.fechaInicio : "Fecha no encontrada"}</p>
      <Link
        to={`/reservation/${reserva.id}`}
        style={{ textDecoration: "none", color: "green" }}
      >
        Detalles
      </Link>
    </>
  );
};
