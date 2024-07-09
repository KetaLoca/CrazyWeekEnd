import React, { useRef, useState } from "react";

export const CrearAlojamientoPage = () => {
    const [sort, setSort] = useState(false)
    const submitRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        submitRef.current.blur()
    }

    function handleSort() { setSort(!sort) }

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
                <button ref={submitRef} type="submit">Añadir alojamiento</button>
            </form>
        </div>
    )
}