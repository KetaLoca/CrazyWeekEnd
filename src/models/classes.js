export class User {
  constructor(email, nombre, apellidos, telefono) {
    this.email = email;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
  }
}

export class Alojamiento {
  constructor(id, userEmail, nombre, descripcion, imgURL, animales, ubicacion) {
    this.id = id;
    this.userEmail = userEmail;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imgURL = imgURL;
    this.animales = animales;
    this.ubicacion = ubicacion;
  }
}

export class Reserva {
  constructor(id, userEmail, idAlojamiento, fechaInicio, fechaFin) {
    this.id = id;
    this.userEmail = userEmail;
    this.alojamientoId = idAlojamiento;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}
