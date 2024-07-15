import React, { useContext, useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { Alojamiento } from "../models/classes";
import { useFirestore } from "../hooks/useFirestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LocationPicker from "../components/LocationPicker";

export const CrearAlojamientoPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripción, setDescripcion] = useState("");
  const [sort, setSort] = useState(false);
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const { userEmail } = useContext(AuthContext);
  const { addAlojamiento } = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (nombre == "" || descripción == "" || files.length == 0) {
      setError(
        "Debes rellenar todos los campos para poder crear el alojamiento"
      );
      return;
    }

    if (files.length < 2) {
      setError("Debes subir dos imágenes como mínimo");
      return;
    }

    try {
      setUploading(true);
      const id = uuid();

      const uploadPromises = files.map(async (file, index) => {
        const storageRef = ref(storage, `${id}/img${index}`);
        const snapShot = await uploadBytes(storageRef, file);
        const dowloadURL = await getDownloadURL(snapShot.ref);
        return dowloadURL;
      });

      const imageURLs = await Promise.all(uploadPromises);

      const alojamiento = new Alojamiento(
        id,
        userEmail,
        nombre,
        descripción,
        imageURLs,
        sort,
        location
      );
      addAlojamiento(alojamiento)
        .then(() => {
          setUploading(false);
          alert("Alojamiento añadido correctamente");
          navigate("/home");
        })
        .catch((e) => {
          console.error(e);
          setError("Error con firestore");
        });
    } catch (e) {
      console.error("Error añadiendo alojamiento", e);
      setError("Error añadiendo el alojamiento, vuelva a intentarlo");
    }
  }

  function handleSort() {
    setSort(!sort);
  }

  function handleFilesChange(e) {
    setFiles(Array.from(e.target.files));
  }

  const handleLocationSelected = (location) => {
    setLocation(location);
  };

  if (uploading) {
    return <h1>Creando alojamiento...</h1>;
  }

  return (
    <div className="crear-alojamiento">
      <h1>Creando alojamiento</h1>
      <form className="crear-alojamiento-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Introduce el nombre del alojamiento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Descripción:</label>
        <textarea
          rows="8"
          placeholder="Redacta una descripción para tu alojamiento"
          value={descripción}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <label>Se admiten animales?</label>
        <input type="checkbox" onChange={handleSort} checked={sort} />

        <div style={{ alignSelf: "center", padding: "20px" }}>
          <label>Ubicación:</label>
          <LocationPicker onLocationSelected={handleLocationSelected} />
        </div>

        <label>Añade las fotos correspondientes</label>
        <input type="file" multiple onChange={handleFilesChange} />
        <button type="submit">Añadir alojamiento</button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
};
