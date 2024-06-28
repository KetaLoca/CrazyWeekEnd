import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"
import { Alojamiento } from "../models/classes";

export const useFirestore = () => {
    const [alojamientos, setAlojamientos] = useState()

    useEffect(() => {

        async function fetchAlojamientos() {
            try {
                const alojammientosColection = collection(db, "alojamientos")
                const snapshot = await getDocs(alojammientosColection)
                const alojamientosList = snapshot.docs.map(doc => Alojamiento.fromFirestore(doc))
                setAlojamientos(alojamientosList)
            }

            catch (error) { console.error("Error recuperando los alojemientos", error) }
        }
        fetchAlojamientos()

    }, [])
    return { alojamientos }
}