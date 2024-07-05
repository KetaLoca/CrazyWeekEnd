import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

export function DetallesReserva() {
  const { id } = useParams();
  const { getReserva, getAlojamiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState();
  const [reserva, setReserva] = useState();

  useEffect(() => {
    getReserva(id)
      .then((result) => {
        setReserva(result);
        console.log(result);

        getAlojamiento(result.idAlojamiento)
          .then((result) => {
            setAlojamiento(result);
            console.log(result);
          })
          .catch((e) => {
            alert("Error recuperando el alojamiento");
          });
      })
      .catch((e) => {
        alert("Error recuperando la reserva");
      });
  }, []);

  return <h1>Probando</h1>;
}
