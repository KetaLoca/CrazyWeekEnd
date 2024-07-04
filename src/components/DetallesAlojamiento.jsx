import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import { Reserva } from "../models/classes";

export function DetallesAlojamiento() {
  const { id } = useParams();
  const { userEmail } = useContext(AuthContext)
  const { getAlojammiento, addReserva } = useFirestore()
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

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
    if (!startDate || !endDate) {
      alert("Debe seleccionar ambas fechas antes de reservar");
      return;
    }
    const reserva = new Reserva(userEmail, alojamiento.id, startDate.toString(), endDate.toString())

    addReserva(reserva).then(() => { alert("Reserva añadida correctamente") }).catch((e) => {
      alert("Error añadiendo reserva")
      console.log(e)
    })
    e.target.blur()
  }

  const CustomInput = React.forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      onChange={onChange}
      onClick={onClick}
      ref={ref}
      style={{ textAlign: "center" }}
    />
  ));

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
            customInput={<CustomInput
              onChange={(e) => { setStartDate(e.target.value) }}
            />}
            minDate={today}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </label>
      </div>

      <div>
        <label>
          Fecha de fin:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={<CustomInput
              onChange={(e) => { setEndDate(e.target.value) }}
            />}
            minDate={startDate || today}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </label>
      </div>
      <button onClick={handleReservar}>Reservar</button>
    </div>
  );
}
