import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";

export function Reservas() {
  const { getReservas } = useFirestore();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = useContext(AuthContext);

  useEffect(() => {
    getReservas(userEmail)
      .then((result) => {
        setReservas(result);
        setLoading(false);
        console.log(reservas);
      })
      .catch((e) => {
        alert("Error recuperando las reservas");
      });
  }, []);

  if (loading) return <h1>Cargando</h1>;

  return (
    <div>
      <ul></ul>
    </div>
  );
}
