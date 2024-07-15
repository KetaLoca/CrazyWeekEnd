import React, { useEffect, useRef, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Link } from "react-router-dom";
import { ImageCarousel } from "./ImageCarousel";

export function Alojamientos() {
  const { getAlojamientos } = useFirestore();
  const [alojamientosList, setAlojamientosList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [inputQuery, setInputQuery] = useState("");
  const [sort, setSort] = useState(false);
  const searchBtnRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAlojamientos()
      .then((alojamientos) => {
        setAlojamientosList(alojamientos);
        setFilteredList(alojamientos);
        setLoading(false);
      })
      .catch((e) => {
        setError("Error al recuperar lista de alojamientos");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (sort) {
      setFilteredList(
        alojamientosList.filter(
          (alojamiento) =>
            (alojamiento.nombre
              .toLowerCase()
              .includes(inputQuery.toLowerCase()) ||
              alojamiento.descripcion
                .toLowerCase()
                .includes(inputQuery.toLowerCase())) &&
            alojamiento.animales == sort
        )
      );
    } else {
      setFilteredList(
        alojamientosList.filter(
          (alojamiento) =>
            (alojamiento.nombre
              .toLowerCase()
              .includes(inputQuery.toLowerCase()) ||
              alojamiento.descripcion
                .toLowerCase()
                .includes(inputQuery.toLowerCase()))
        )
      );
    }
    searchBtnRef.current.blur();
  }

  function handleChange(e) {
    setInputQuery(e.target.value);
  }

  function handleSort() {
    setSort(!sort);
  }

  if (loading) return <h1>Cargando</h1>;

  return (
    <div>
      <header className="filtros">
        <h1>Buscador de alojamientos</h1>
        <form className="form" onSubmit={handleSubmit}>
          <span className="checkboxanimales">
            <label>Admiten animales</label>
            <input type="checkbox" onChange={handleSort} checked={sort} />
          </span>
          <input
            onChange={handleChange}
            value={inputQuery}
            name="query"
            placeholder="Barra de búsqueda"
          />
          <button ref={searchBtnRef} className="boton" type="submit">
            Buscar
          </button>
        </form>
        {error && (
          <p style={{ color: "red" }} className="error">
            {error}
          </p>
        )}
      </header>
      <ul className="alojamientos">
        {filteredList.length > 0 ? (
          filteredList.map((alojamiento) => (
            <li className="alojamientos-item" key={alojamiento.id}>
              <ImageCarousel images={alojamiento.imgURL} />
              <h2>{alojamiento.nombre}</h2>
              <p>{alojamiento.descripcion}</p>
              <Link
                to={`/alojamiento/${alojamiento.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                Detalles
              </Link>
            </li>
          ))
        ) : (
          <li>No hay alojamientos disponibles.</li>
        )}
      </ul>
    </div>
  );
}
