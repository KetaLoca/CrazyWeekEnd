import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { ImageCarousel } from "../components/ImageCarousel";

export function GestionAlojamientoPage() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento } = useFirestore();

  useEffect(() => {
    getAlojamiento(id)
      .then((alojamiento) => {
        setAlojamiento(alojamiento);
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
      });
  }, [id]);

  const handleEliminar = () => {}

  return (
    <div>
      <h1>Gestión de alojamiento</h1>
      {alojamiento ? (
        <div>
          <h2>{alojamiento.nombre}</h2>
          <ImageCarousel images={alojamiento.imgURL} />
          <button style={{marginTop:"22px"}} className="eliminar-reserva-btn" onClick={handleEliminar}>Eliminar alojamiento</button>
        </div>
      ) : (
        <h3>No se encuentra el alojamiento</h3>
      )}
    </div>
  );
}
