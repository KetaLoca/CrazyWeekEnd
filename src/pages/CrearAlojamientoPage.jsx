import React, { useEffect, useRef, useState } from "react";
import { storage } from "../firebaseConfig";
import { Alojamiento } from "../models/classes";
import { useFirestore } from "../hooks/useFirestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const CrearAlojamientoPage = () => {
    const [nombre, setNombre] = useState("")
    const [descripción, setDescripcion] = useState("")
    const [sort, setSort] = useState(false)
    const [files, setFiles] = useState([])
    const [error, setError] = useState("")
    const { addAlojamiento } = useFirestore()
    const navigate = useNavigate()
    const submitRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
        }, 2400);
        return () => clearTimeout(timer);
    }, [error])

    async function handleSubmit(e) {
        e.preventDefault()

        if (nombre == "" || descripción == "" || files.length == 0) {
            setError("Debes rellenar todos los campos para poder crear el alojamiento")
            return
        }

        try {
            const id = uuid()

            const uploadPromises = files.map(async (file, index) => {
                const storageRef = ref(storage, `${id}/img${index}`)
                const snapShot = await uploadBytes(storageRef, file)
                const dowloadURL = await getDownloadURL(snapShot.ref)
                return dowloadURL
            })

            const imageURLs = await Promise.all(uploadPromises)
            console.log(imageURLs)

            const alojamiento = new Alojamiento(id, nombre, descripción, imageURLs, sort)
            addAlojamiento(alojamiento).then(() => {
                alert("Alojamiento añadido correctamente")
                navigate("/home")
            }).catch((e) => {
                console.error(e)
                setError("Error con firestore")
            })

        } catch (e) {
            console.error("Error añadiendo alojamiento", e)
            setError("Error añadiendo el alojamiento, vuelva a intentarlo")
        }
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
                <p className="error">{error}</p>
            </form>
        </div>
    )
}