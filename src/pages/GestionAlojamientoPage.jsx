import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { ImageCarousel } from "../components/ImageCarousel";
import { AuthContext } from "../context/AuthContext";

export function GestionAlojamientoPage() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento } = useFirestore();
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAlojamiento(id)
      .then((alojamiento) => {
        if (alojamiento.emailUser == userEmail) {
          setAlojamiento(alojamiento);
        } else {
          alert("Debe estar logueado y ser el gerente del alojamiento");
          navigate("/home")
        }
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
      });
  }, [id]);

  const handleEliminar = () => {};

  return (
    <div>
      <h1>Gestión de alojamiento</h1>
      {alojamiento ? (
        <div>
          <aside>
            Gerente: <strong>{alojamiento.emailUser}</strong>
          </aside>
          <ImageCarousel images={alojamiento.imgURL} />
          <h2>{alojamiento.nombre}</h2>
          <p>{alojamiento.descripcion}</p>
          <button className="eliminar-reserva-btn" onClick={handleEliminar}>
            Eliminar alojamiento
          </button>
        </div>
      ) : (
        <h3>No se encuentra el alojamiento</h3>
      )}
    </div>
  );
}
