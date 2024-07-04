import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";

export function Reservas() {
  const { getAlojamientos } = useFirestore();
  const [reservas, setReservas] = useState();
  const [loading, setLoading] = useState(true);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    getAlojamientos().then((resultList) => {
      setReservas(resultList)
      setLoading(false)
      console.log(reservas)
    }).catch((e) => { console.log(e) })
  }, [loading])

  if (loading) return <h1>Cargando</h1>;

  return (
    <div>
      <ul>{reservas.map((reserva) => (<li key={reserva.id}>{reserva.id}</li>))}</ul>
    </div>
  );
}
