import react from "@vitejs/plugin-react-swc";
import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

export function DetallesAlojamiento() {
    const { id } = useParams()
    const getAlojammiento = useFirestore()
    const alojamiento = getAlojammiento(id)

    if (!alojamiento) { return <h2>No se ha encontrado el alojamiento</h2> }

    return (
        <div>
            <h1>{alojamiento.nombre}</h1>
        </div>)
}