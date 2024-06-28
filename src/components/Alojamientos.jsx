import React from "react";
import { useFirestore } from "../hooks/useFirestore";
import { Alojamiento } from "../models/classes";

export function Alojamientos() {
    const alojamientos = useFirestore()

    return (
        <>
            <ul>
                {alojamientos.map(alojamiento => (<li key={alojamiento.id}>{alojamiento.nombre}</li>))}
            </ul>
        </>
    )
}