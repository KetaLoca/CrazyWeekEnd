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
    const response = await axios.post("http://localhost:3000/alojamientos/", {
      id: alojamiento.id,
      userEmail: alojamiento.userEmail,
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      animales: alojamiento.animales,
      imgURL: alojamiento.imgURL,
      ubicacion: alojamiento.ubicacion,
    });
    return response
  }

  async function getAlojamiento(id) {
    const response = await axios.get(`http://localhost:3000/alojamientos/${id}`)
    return response.data
  }

  async function deleteAlojamiento(id) {
    const response = await axios.delete(`http://localhost:3000/alojamientos/${id}`)
    return response
  }

  async function getAlojamientosByEmail(email) {
    const response = await axios.get(`http://localhost:3000/alojamientos?userEmail=${email}`)
    return response.data
  }

  async function getAlojamientos() {
    const response = await axios.get(`http://localhost:3000/alojamientos/`)
    return response.data
  }

  async function addReserva(reserva) {
    const response = await axios.post("http://localhost:3000/reservas/",
      {
        id: reserva.id,
        userEmail: reserva.userEmail,
        alojamientoId: reserva.alojamientoId,
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin
      }
    )
    return response
  }

  async function getReserva(id) {
    const response = await axios.get(`http://localhost:3000/reservas/${id}`)
    return response.data
  }

  async function deleteReserva(id) {
    const response = await axios.delete(`http://localhost:3000/reservas/${id}`)
    return response
  }

  const getReservas = async (email) => {
    const response = await axios.get(`http://localhost:3000/reservas?userEmail=${email}`)
    return response.data
  };

  const getReservasByAlojamiento = async (id) => {
    const response = await axios.get(`http://localhost:3000/reservas?alojamientoId=${id}`)
    return response.data
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
