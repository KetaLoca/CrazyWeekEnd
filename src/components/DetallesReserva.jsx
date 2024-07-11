import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { format } from "date-fns";
import { ImageCarousel } from "./ImageCarousel";

export function DetallesReserva() {
  const { id } = useParams();
  const { getReserva, getAlojamiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState();
  const [reserva, setReserva] = useState();
  const [loading, setLoading] = useState(true);
  const { deleteReserva } = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    getReserva(id)
      .then((result) => {
        setReserva(result);

        getAlojamiento(result.idAlojamiento)
          .then((result) => {
            setAlojamiento(result);
            setLoading(false);
          })
          .catch((e) => {
            alert("Error recuperando el alojamiento");
          });
      })
      .catch((e) => {
        alert("Error recuperando la reserva");
      });
  }, [id]);

  function handleDelete(e) {
    e.preventDefault();
    deleteReserva(id)
      .then(() => {
        alert("Reserva eliminada correctamente");
        navigate("/home");
      })
      .catch((e) => {
        alert("Ha ocurrido un error eliminando el usuario");
      });
  }

  if (loading) return <h1>Cargando</h1>;

  return (
    <>
      {alojamiento && reserva ? (
        <div className="reservadetalles">
          <h1>Gestión reserva</h1>
          <h2>{alojamiento.nombre}</h2>
          <ImageCarousel images={alojamiento.imgURL} />
          <strong>
            {format(reserva.fechaInicio, "dd-MM-yyyy")} ||{" "}
            {format(reserva.fechaFin, "dd-MM-yyyy")}
          </strong>
          <p>{alojamiento.descripcion}</p>
          <button className="eliminar-reserva-btn" onClick={handleDelete}>Eliminar reserva</button>
        </div>
      ) : (
        <h1>No hay datos</h1>
      )}
    </>
  );
}
