import React, { useState } from "react";

export const CrearAlojamientoPage = () => {
    const [sort, setSort] = useState(false)

    function handleSort() { setSort(!sort) }

    return (
        <div className="crear-alojamiento">
            <h1>Añadir alojamiento</h1>
            <form className="crear-alojamiento-form">
                <label>Nombre:</label>
                <input type="text" placeholder="Introduce el nombre del alojamiento" />
                <label>Descripción:</label>
                <input type="text" placeholder="Redacta una descripción para tu alojamiento" />
                <label>Se admiten animales?<input type="checkbox" onChange={handleSort} checked={sort} /></label>
            </form>
        </div>
    )
}