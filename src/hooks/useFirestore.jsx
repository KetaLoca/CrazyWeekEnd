import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { Alojamiento, Reserva, User } from "../models/classes";

export const useFirestore = () => {
  async function getAlojamientos() {
    const alojamientosColection = collection(db, "alojamientos");
    const snapshot = await getDocs(alojamientosColection);
    const alojamientosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(alojamientosList);
    return alojamientosList;
  }

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

  async function getReservas(email) {
    const collectionRef = collection(db, "reservas");
    const consulta = query(
      collectionRef,
      where("emailuser", "==", email.toString())
    );
    const docSnap = await getDocs(consulta);
    const reservasList = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reservasList;
  }

  return {
    getAlojamientos,
    addUser,
    getUser,
    getAlojammiento,
    addReserva,
    getReserva,
    getReservas,
  };
};
