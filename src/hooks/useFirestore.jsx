import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useFirestore = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    async function fetchAlojamientos() {
      try {
        const alojammientosColection = collection(db, "alojamientos");
        const snapshot = await getDocs(alojammientosColection);
        const alojamientosList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlojamientos(alojamientosList);
      } catch (error) {
        console.error("Error recuperando los alojemientos", error);
      }
    }
    fetchAlojamientos();
  }, []);
  return { alojamientos };
};
