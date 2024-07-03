import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

export function DetallesAlojamiento() {
  const { id } = useParams();
  const { getAlojammiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getAlojammiento(id)
      .then((a) => {
        setAlojamiento(a);
        setLoading(false);
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
      });
  }, [id]);

  function handleReservar(e) {
    e.preventDefault();
  }

  if (loading) {
    return <h1>Cargando</h1>;
  }
  if (alojamiento == null) {
    return <h1>No se ha encontrado el alojamiento</h1>;
  }
  return (
    <div className="alojamiento">
      <h1>{alojamiento.nombre}</h1>
      <img
        src="https://www.ruralesdata.com/cache/alojamientos/aguirre-casa-rural/202-aguirre-casa-rural-elizondo-fachada.jpg"
        alt="Imagen casa rural"
      />
      <h2>{alojamiento.descripcion}</h2>

      <div>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              e.preventDefault();
              setStartDate(e.target.value);
            }}
          />
        </label>
      </div>

      <div>
        <label>
          Fecha de fin:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </label>
      </div>
      <button onClick={handleReservar}>Reservar</button>
    </div>
  );
}
