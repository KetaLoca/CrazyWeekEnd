import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

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

  async function addUser(user) {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
    });
  }

  return { alojamientos, addUser };
};
