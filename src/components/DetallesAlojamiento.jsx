import { useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect, useState } from "react";

export function DetallesAlojamiento() {
  const { id } = useParams();
  const { getAlojammiento } = useFirestore();
  const [alojamiento, setAlojamiento] = useState(null);

  useEffect(() => {
    setAlojamiento(getAlojammiento(id));
  }, [id]);

  if (alojamiento == null) {
    return <h2>No se ha encontrado el alojamiento</h2>;
  }

  if (alojamiento) {
    return <h1>{alojamiento.nombre}</h1>;
  }
}
