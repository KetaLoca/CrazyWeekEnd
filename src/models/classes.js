import { v4 as UUID } from 'uuid'

export class Alojamiento {
  constructor(nombre, descripcion, imgURL, animales) {
    this.id = UUID();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imgURL = imgURL;
    this.animales = animales;
  }
}

export class User {
  constructor(email, nombre, apellidos, telefono) {
    this.email = email;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
  }
}

export class Reserva {
  constructor(emailUser, idAlojamiento, fechaInicio, fechaFin) {
    this.id = UUID();
    this.emailUser = emailUser;
    this.idAlojamiento = idAlojamiento;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}
