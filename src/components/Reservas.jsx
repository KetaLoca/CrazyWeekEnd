import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";

export function Reservas() {
  const { getReservas } = useFirestore();
  const [reservas, setReservas] = useState();
  const [loading, setLoading] = useState(true);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    getReservas(userEmail).then((resultList) => {
      setReservas(resultList)
      setLoading(false)
      console.log(resultList)
    }).catch((e) => { console.log(e) })
  }, [])

  if (loading) return <h1>Cargando</h1>;

  return (
    <div>
      <ul>{}</ul>
    </div>
  );
}
