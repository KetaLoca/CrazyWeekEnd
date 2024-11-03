import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { ImageCarousel } from "../components/ImageCarousel";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebaseConfig";
import { deleteObject, ref, listAll } from "firebase/storage";

export function GestionAlojamientoPage() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState();
  const { getAlojamiento, deleteAlojamiento } = useFirestore();
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAlojamiento(id)
      .then((alojamiento) => {
        if (alojamiento.userEmail == userEmail) {
          setAlojamiento(alojamiento);
        } else {
          alert("Debe estar logueado y ser el gerente del alojamiento");
          navigate("/home");
        }
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
      });
  }, [id]);

  const handleEliminar = async () => {
    const folderRef = ref(storage, id); // 'id' es la ruta de la carpeta

    // Listar todos los archivos en la carpeta
    await listAll(folderRef)
      .then(async (res) => {
        // Crear un array de promesas de eliminación
        const deletePromises = res.items.map(async (itemRef) =>
          await deleteObject(itemRef)
        );

        // Ejecutar todas las promesas
        await Promise.all(deletePromises);
      })
      .then(async () => {
        // Eliminar el alojamiento de la base de datos
        await deleteAlojamiento(id)
          .then(() => {
            alert("Alojamiento eliminado correctamente");
            navigate("/home");
          })
          .catch((error) => {
            alert("Error eliminando el alojamiento");
            console.error(
              "Error eliminando el alojamiento de la base de datos:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error eliminando archivos de la carpeta:", error);
      });
  };

  return (
    <div>
      <h1>Gestión de alojamiento</h1>
      {alojamiento ? (
        <div style={{ maxWidth: "700px" }}>
          <aside style={{ marginBottom: "20px" }}>
            Gerente: <strong>{alojamiento.userEmail}</strong>
          </aside>
          <ImageCarousel images={alojamiento.imgURL} />
          <h2>{alojamiento.nombre}</h2>
          <p>{alojamiento.descripcion}</p>
          <button className="eliminar-reserva-btn" onClick={handleEliminar}>
            Eliminar alojamiento
          </button>
        </div>
      ) : (
        <h3>No se encuentra el alojamiento</h3>
      )}
    </div>
  );
}
