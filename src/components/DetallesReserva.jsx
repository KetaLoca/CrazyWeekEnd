import React from "react";
import { useParams } from "react-router-dom";

export function DetallesReserva() {
  const { id } = useParams();

  return <h1>Probando</h1>;
}
