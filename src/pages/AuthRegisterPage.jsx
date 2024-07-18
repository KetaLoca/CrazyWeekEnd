import React, { useState } from "react";

export function AuthRegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [telefono, setTelefono] = useState("")

    return (
        <div className="authcontainer">
            <h1>Registrarse</h1>
            <form className="loginform">
                <input type="email" placeholder="Introduzca su correo electrónico" />
                <input type="password" placeholder="Introduzca una contraseña" />
                <input type="password" placeholder="Repita la contraseña" />
                <input type="text" placeholder="Introduzca su nombre" />
                <input type="text" placeholder="Introduzca sus apellidos" />
                <input type="text" placeholder="Introduzca su teléfono" />
            </form>
        </div>
    )
}