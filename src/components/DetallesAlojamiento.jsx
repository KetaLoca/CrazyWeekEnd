import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

export function DetallesAlojamiento() {
  const { id } = useParams();
  const { getAlojammiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlojammiento(id)
      .then((a) => {
        setAlojamiento(a);
        setLoading(false);
      })
      .catch((e) => {
        alert("Error recuperando el alojamiento");
      });
  }, [id]);

  console.log(alojamiento);

  if (loading) {
    return <h1>Cargando</h1>;
  } else if (alojamiento == null) {
    return <h1>No se ha encontrado el alojamiento</h1>;
  } else {
    <h1>{alojamiento.nombre}</h1>;
  }
}
