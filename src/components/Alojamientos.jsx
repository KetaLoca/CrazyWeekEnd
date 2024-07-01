import React, { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";

export function Alojamientos() {
  const { alojamientos } = useFirestore();

  if (!Array.isArray(alojamientos)) {
    console.error("Alojamientos is not an array:", alojamientos); // Depuración adicional
    return <div>Error: Alojamientos is not an array</div>;
  }

  return (
    <ul className="alojamientos">
      {alojamientos.length > 0 ? (
        alojamientos.map((alojamiento) => (
          <li key={alojamiento.id}>
            <img
              src="https://www.ruralesdata.com/cache/alojamientos/aguirre-casa-rural/202-aguirre-casa-rural-elizondo-fachada.jpg"
              alt="Imagen casa rural"
            />
            <h2>{alojamiento.nombre}</h2>
            <p>{alojamiento.descripcion}</p>
          </li>
        ))
      ) : (
        <li>No hay alojamientos disponibles.</li>
      )}
    </ul>
  );
}
