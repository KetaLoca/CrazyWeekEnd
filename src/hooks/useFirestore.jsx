import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { Alojamiento, Reserva, User } from "../models/classes";
import axios from "axios";

axios.defaults.withCredentials = true

export const useFirestore = () => {

  async function getUser(email) {
    const response = await axios.get("http://localhost:3000/users/")
    return response.data;
  }

  const addUser = async (user) => {
    const response = await axios.patch(`http://localhost:3000/users/${user.email}`,
      {
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono
      }
    )
    return response
  }

  async function addAlojamiento(alojamiento) {
    await setDoc(doc(db, "alojamientos", alojamiento.id), {
      id: alojamiento.id,
      emailuser: alojamiento.emailUser,
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      animales: alojamiento.animales,
      imgURL: alojamiento.imgURL,
      ubicacion: alojamiento.ubicacion,
    });
  }

  async function getAlojamiento(id) {
    const docRef = doc(db, "alojamientos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      const alojamiento = new Alojamiento(
        data.id,
        data.emailuser,
        data.nombre,
        data.descripcion,
        data.imgURL,
        data.animales,
        data.ubicacion
      );
      return alojamiento;
    } else {
      return null;
    }
  }

  async function deleteAlojamiento(id) {
    const docRef = doc(db, "alojamientos", id);
    await deleteDoc(docRef);
  }

  async function getAlojamientosByEmail(email) {
    const collectionRef = collection(db, "alojamientos");
    const consulta = query(collectionRef, where("emailuser", "==", email));
    const snap = await getDocs(consulta);
    const alojamientos = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return alojamientos;
  }

  async function getAlojamientos() {
    const alojamientosColection = collection(db, "alojamientos");
    const snapshot = await getDocs(alojamientosColection);
    const alojamientosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return alojamientosList;
  }

  async function addReserva(reserva) {
    await setDoc(doc(db, "reservas", reserva.id), {
      id: reserva.id,
      emailuser: reserva.emailUser,
      idalojamiento: reserva.idAlojamiento,
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin,
    });
  }

  async function getReserva(id) {
    const docRef = doc(db, "reservas", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const data = docSnap.data();
      const reserva = new Reserva(
        data.id,
        data.emailuser,
        data.idalojamiento,
        data.fechaInicio,
        data.fechaFin
      );
      return reserva;
    } else {
      return null;
    }
  }

  async function deleteReserva(id) {
    const docRef = doc(db, "reservas", id);
    await deleteDoc(docRef);
  }

  const getReservas = async (email) => {
    const collectionRef = collection(db, "reservas");
    const consulta = query(collectionRef, where("emailuser", "==", email));
    const docSnap = await getDocs(consulta);
    const reservas = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reservas;
  };

  const getReservasByAlojamiento = async (id) => {
    const collectionRef = collection(db, "reservas");
    const consulta = query(collectionRef, where("idalojamiento", "==", id));
    const docSnap = await getDocs(consulta);
    const reservas = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reservas;
  };

  return {
    addAlojamiento,
    getAlojamiento,
    deleteAlojamiento,
    getAlojamientosByEmail,
    getAlojamientos,
    addUser,
    getUser,
    addReserva,
    getReserva,
    deleteReserva,
    getReservas,
    getReservasByAlojamiento,
  };
};
