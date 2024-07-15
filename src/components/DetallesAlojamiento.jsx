import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/AuthContext";
import { Reserva } from "../models/classes";
import { v4 as uuidv4 } from "uuid";
import { ImageCarousel } from "./ImageCarousel";
import LocationViewer from "./LocationViewer";

export function DetallesAlojamiento() {
  const { id } = useParams();
  const { userEmail, isLogged } = useContext(AuthContext);
  const { getAlojamiento, addReserva, getReservasByAlojamiento } =
    useFirestore();
  const [alojamiento, setAlojamiento] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [disabledDays, setDisabledDays] = useState();
  const navigate = useNavigate();
  const today = new Date();

  useEffect(() => {
    getAlojamiento(id)
      .then((a) => {
        setAlojamiento(a);
        setLocation(a.ubicacion);
        setLoading(false);
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
        console.error(e);
      });

    getReservasByAlojamiento(id)
      .then((resultList) => {
        setReservas(resultList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  useEffect(() => {
    const bookerIntervals = getDateIntervals(reservas);
    setDisabledDays(bookerIntervals);
  }, [reservas]);

  const getDateIntervals = (reservas) => {
    return reservas.map((reserva) => ({
      start: subDays(new Date(reserva.fechaInicio), 1),
      end: new Date(reserva.fechaFin),
    }));
  };

  function handleReservar(e) {
    e.preventDefault();
    if (!isLogged) {
      alert("Debe iniciar sesión para poder reservar algún alojamiento");
      return;
    }
    if (!startDate || !endDate) {
      alert("Debe seleccionar ambas fechas para la reserva");
      return;
    }
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    const reserva = new Reserva(
      uuidv4(),
      userEmail,
      alojamiento.id,
      formattedStartDate,
      formattedEndDate
    );

    addReserva(reserva)
      .then(() => {
        alert("Reserva añadida correctamente");
        navigate("/home");
      })
      .catch((e) => {
        alert("Error añadiendo reserva");
        console.log(e);
      });
    e.target.blur();
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
    <div className="alojamiento-item" style={{ maxWidth: "700px" }}>
      <h1>{alojamiento.nombre}</h1>
      <ImageCarousel className="imgcarousel" images={alojamiento.imgURL} />

      {alojamiento.ubicacion && (
        <div style={{ padding: "6px" }}>
          <LocationViewer location={location} />
        </div>
      )}

      <p>{alojamiento.descripcion}</p>

      <div>
        <label>
          Fecha de inicio:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
            customInput={
              <CustomInput
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            }
            minDate={today}
            maxDate={endDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            excludeDateIntervals={disabledDays}
          />
        </label>
      </div>
      <div>
        <label>
          Fecha de fin:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
            customInput={
              <CustomInput
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            }
            minDate={startDate || today}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            excludeDateIntervals={disabledDays}
          />
        </label>
      </div>
      <button className="reservar-button" onClick={handleReservar}>
        Reservar
      </button>
    </div>
  );
}
