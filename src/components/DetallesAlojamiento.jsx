import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    e.target.blur();
    if (!startDate || !endDate) {
      alert("Debe seleccionar ambas fechas antes de reservar");
      return;
    }
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
      <img src={alojamiento.imgURL} alt="Imagen casa rural" />
      <h2>{alojamiento.descripcion}</h2>

      <div>
        <label>
          Fecha de inicio:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </label>
      </div>

      <div>
        <label>
          Fecha de fin:{" "}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </label>
      </div>
      <button onClick={handleReservar}>Reservar</button>
    </div>
  );
}
