import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";
import { ReservaElement } from "./ReservaElement";

export function Reservas() {
  const { getReservas } = useFirestore();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    getReservas(userEmail)
      .then((resultList) => {
        setReservas(resultList);
        setLoading(false);
        console.log(resultList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userEmail]);

  if (loading) return <h1>Cargando</h1>;

  return (
    <div>
      {reservas.length > 0 ? (
        <ul className="reservas">
          {reservas.map((reserva) => (
            <li className="reservas-item" key={reserva.id}>
              <ReservaElement reserva={reserva} />
            </li>
          ))}
        </ul>
      ) : (
        <h1>No hay reservas por el momento</h1>
      )}
    </div>
  );
}
