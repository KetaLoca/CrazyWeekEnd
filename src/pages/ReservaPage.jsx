import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { format } from "date-fns";
import { ImageCarousel } from "../components/ImageCarousel";

export function ReservaPage() {
  const { id } = useParams();
  const { getReserva, getAlojamiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState();
  const [reserva, setReserva] = useState();
  const [loading, setLoading] = useState(true);
  const { deleteReserva } = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    getReserva(id)
      .then((result) => {
        setReserva(result);

        getAlojamiento(result.alojamientoId)
          .then((result) => {
            setAlojamiento(result);
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

  async function handleDelete(e) {
    e.preventDefault();
    await deleteReserva(id)
      .then(() => {
        alert("Reserva eliminada correctamente");
        navigate("/home");
      })
      .catch((e) => {
        alert("Ha ocurrido un error eliminando la reserva");
      });
  }

  if (loading) return <h1>Cargando</h1>;

  return (
    <>
      {alojamiento && reserva ? (
        <div className="reservadetalles" style={{ maxWidth: "700px" }}>
          <h1>Gestión reserva</h1>
          <ImageCarousel images={alojamiento.imgURL} />
          <h2 style={{ marginTop: "20px", marginBottom: "-10px" }}>{alojamiento.nombre}</h2>
          <p style={{ marginBottom: "-10px" }}>{alojamiento.descripcion}</p>
          <strong>
            {format(reserva.fechaInicio, "dd-MM-yyyy")} ||{" "}
            {format(reserva.fechaFin, "dd-MM-yyyy")}
          </strong>
          <button className="eliminar-reserva-btn" onClick={handleDelete}>
            Eliminar reserva
          </button>
        </div>
      ) : (
        <h1>No hay datos</h1>
      )}
    </>
  );
}