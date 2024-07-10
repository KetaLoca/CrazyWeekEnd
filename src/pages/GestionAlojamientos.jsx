import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { AuthContext } from "../context/AuthContext";

export const GestionAlojamientos = () => {
    const [alojamientos, setAlojamientos] = useState()
    const { getAlojamientosByEmail } = useFirestore()
    const { userEmail } = useContext(AuthContext)

    useEffect(() => {
        getAlojamientosByEmail(userEmail).then((alojamientos) => {
            setAlojamientos(alojamientos)
            console.log(alojamientos)
        }).catch((e) => { console.error("Error obteniendo alojamientos de firestore", e) })
    }, [])

    return <div>
        <h1>Aquí se listarán los alojamientos asociados al email del usuario</h1>
    </div>

}