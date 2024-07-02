import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

export function DetallesAlojamiento() {
    const { id } = useParams()
    const { getAlojammiento } = useFirestore()
    const [alojamiento, setAlojamiento] = useState(null)

    useEffect(() => {
        async function fetchAlojamientos() {
            const fetchedAlojamiento = await getAlojammiento(id)
            setAlojamiento(fetchAlojamientos)
        } fetchAlojamientos()
    }, [])

    if (!alojamiento) { return <h2>No se ha encontrado el alojamiento</h2> }

    return (
        <div>
            <h1>{alojamiento.nombre}</h1>
        </div>)
}