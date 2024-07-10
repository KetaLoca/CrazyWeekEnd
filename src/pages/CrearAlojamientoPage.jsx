import React, { useEffect, useRef, useState } from "react";

export const CrearAlojamientoPage = () => {
    const [nombre, setNombre] = useState("")
    const [descripción, setDescripcion] = useState("")
    const [sort, setSort] = useState(false)
    const [files, setFiles] = useState()
    const submitRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        submitRef.current.blur()
    }

    function handleSort() { setSort(!sort) }

    function handleFilesChange(e) { setFiles(Array.from(e.target.files)) }

    return (
        <div className="crear-alojamiento">
            <h1>Creando alojamiento</h1>
            <form className="crear-alojamiento-form" onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" placeholder="Introduce el nombre del alojamiento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label>Descripción:</label>
                <textarea rows="8" placeholder="Redacta una descripción para tu alojamiento" value={descripción} onChange={(e) => setDescripcion(e.target.value)} />
                <label>Se admiten animales?</label>
                <input type="checkbox" onChange={handleSort} checked={sort} />
                <label>Añade las fotos correspondientes</label>
                <input type="file" multiple onChange={handleFilesChange} />
                <button ref={submitRef} type="submit">Añadir alojamiento</button>
            </form>
        </div>
    )
}