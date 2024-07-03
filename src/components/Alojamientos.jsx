import React, { useEffect, useRef, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Link } from "react-router-dom";

export function Alojamientos() {
  const { alojamientos } = useFirestore();
  const [filteredList, setFilteredList] = useState(alojamientos);
  const [inputQuery, setInputQuery] = useState("");
  const [sort, setSort] = useState(false);
  const searchBtnRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setFilteredList(alojamientos);
  }, [alojamientos]);

  function handleSubmit(e) {
    e.preventDefault();
    setFilteredList(
      alojamientos.filter(
        (alojamiento) =>
          alojamiento.nombre.toLowerCase().includes(inputQuery.toLowerCase()) ||
          alojamiento.descripcion
            .toLowerCase()
            .includes(inputQuery.toLowerCase())
      )
    );
    searchBtnRef.current.blur();
  }

  function handleChange(e) {
    setInputQuery(e.target.value);
  }

  function handleSort() {
    setSort(!sort);
    setFilteredList(
      filteredList.filter((alojamiento) => alojamiento.animales == sort)
    );
  }

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
            <li key={alojamiento.id}>
              <img
                src="https://www.ruralesdata.com/cache/alojamientos/aguirre-casa-rural/202-aguirre-casa-rural-elizondo-fachada.jpg"
                alt="Imagen casa rural"
              />
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
