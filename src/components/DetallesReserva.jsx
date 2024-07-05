import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

export function DetallesReserva() {
  const { id } = useParams();
  const { getReserva, getAlojamiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState();
  const [reserva, setReserva] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReserva(id)
      .then((result) => {
        setReserva(result);
        console.log(result);

        getAlojamiento(result.idAlojamiento)
          .then((result) => {
            setAlojamiento(result);
            console.log(result);
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

  if (loading) return <h1>Cargando</h1>;

  return (
    <>
      {alojamiento && reserva ? (
        <div className="reservadetalles">
          <h1>{alojamiento.nombre}</h1>
          <strong>
            Fecha de inicio: {reserva.fechaInicio} || Fecha de fin:{" "}
            {reserva.fechaFin}
          </strong>
          <img src={alojamiento.imgURL} />
          <h3>{alojamiento.descripcion}</h3>
          <button>Eliminar reserva</button>
        </div>
      ) : (
        <h1>No hay datos</h1>
      )}
    </>
  );
}
