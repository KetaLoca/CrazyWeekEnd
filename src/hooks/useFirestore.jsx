import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { Alojamiento, User } from "../models/classes";

export const useFirestore = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    async function fetchAlojamientos() {
      try {
        const alojamientosColection = collection(db, "alojamientos");
        const snapshot = await getDocs(alojamientosColection);
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

  const getAlojammiento = async (id) => {
    const docRef = doc(db, "alojamientos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      const alojamiento = new Alojamiento(
        id,
        data.nombre,
        data.descripcion,
        data.imgURL,
        data.animales
      );
      console.log(alojamiento);
      return alojamiento;
    } else {
      return null;
    }
  };

  async function addUser(user) {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      nombre: user.nombre,
      apellidos: user.apellidos,
      telefono: user.telefono,
    });
  }

  async function getUser(email) {
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userDoc = docSnap.data();
      const user = new User(
        userDoc.email,
        userDoc.nombre,
        userDoc.apellidos,
        userDoc.telefono
      );
      console.log(user);
      return user;
    } else {
      return null;
    }
  }

  async function getReservas(email) {}

  return { alojamientos, addUser, getUser, getAlojammiento };
};
