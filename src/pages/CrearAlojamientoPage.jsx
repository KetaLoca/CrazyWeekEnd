import React, { useRef, useState } from "react";

export const CrearAlojamientoPage = () => {
    const [files, setFiles] = useState()
    const [sort, setSort] = useState(false)
    const submitRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        submitRef.current.blur()
    }

    function handleSort() { setSort(!sort) }

    function handleFilesChange() { }

    return (
        <div className="crear-alojamiento">
            <h1>Creando alojamiento</h1>
            <form className="crear-alojamiento-form" onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" placeholder="Introduce el nombre del alojamiento" />
                <label>Descripción:</label>
                <input type="text" placeholder="Redacta una descripción para tu alojamiento" />
                <label>Se admiten animales?</label>
                <input type="checkbox" onChange={handleSort} checked={sort} />
                <input type="file" multiple onChange={handleFilesChange} />
                <button ref={submitRef} type="submit">Añadir alojamiento</button>
            </form>
        </div>
    )
}