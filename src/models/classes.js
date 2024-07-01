export class Alojamiento {
  constructor(id, nombre, descripcion, imgURL) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imgURL = imgURL;
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
