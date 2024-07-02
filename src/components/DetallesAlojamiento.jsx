import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

export function DetallesAlojamiento() {
    const { id } = useParams()
    const { getAlojammiento } = useFirestore()
    const alojamiento = getAlojammiento(id) 

    // useEffect(() => {
    //     async function fetchAlojamientos() {
    //         const fetchedAlojamiento = await getAlojammiento(id)
    //         setAlojamiento(fetchAlojamientos)
    //     } fetchAlojamientos()
    // }, [])

    if (alojamiento == null) { return <h2>No se ha encontrado el alojamiento</h2> }

    return <h1>{alojamiento.nombre}</h1>

}