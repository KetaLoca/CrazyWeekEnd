import React, { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export function Alojamientos() {
  const { alojamientos } = useFirestore();
  const [filteredList, setFilteredList] = useState(alojamientos)
  const [inputQuery, setInputQuery] = useState("")
  const [sort, setSort] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => { setFilteredList(alojamientos) }, [])

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleChange(e) {
    setInputQuery(e.target.value)
    setFilteredList(alojamientos.filter((alojamiento) => alojamiento.nombre.toLowerCase().includes(inputQuery.toLowerCase())))
  }

  function handleSort() { setSort(!sort) }


  return (<div>
    <header className="filtros">
      <h1>Buscador de alojamientos</h1>
      <form className='form' onSubmit={handleSubmit}>
        <span className="checkboxanimales"><label>Admiten animales</label>
          <input type='checkbox' onChange={handleSort} checked={sort} /></span>
        <input onChange={handleChange} value={inputQuery} name='query' placeholder='Barra de búsqueda' />
        <button className='boton' type='submit'>Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
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
          </li>
        ))
      ) : (
        <li>No hay alojamientos disponibles.</li>
      )}
    </ul>
  </div>
  );
}
