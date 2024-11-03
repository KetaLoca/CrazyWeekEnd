import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export function AuthRegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [telefono, setTelefono] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password || !verifyPassword || !nombre || !apellidos || !telefono) {
            alert("Debe rellenar todos los campos para poder registrarse")
            return
        }

        if (password != verifyPassword) {
            alert("Los dos campos de contraseña no coinciden")
            return
        }

        await axios.post('http://localhost:3000/users/register',
            {
                email: email,
                password: password,
                nombre: nombre,
                apellidos: apellidos,
                telefono: Number.parseInt(telefono)
            })
            .then((response) => {
                if (response.status === 201) {
                    alert("Usuario registrado correctamente, ya puede iniciar sesión")
                    navigate("/auth")
                }
            })
            .catch((error) => {
                if (error.status === 500) {
                    alert("Error creando el usuario, vuelva a intentarlo")
                }

                if (error.status === 409) {
                    alert("El email que intenta registrar ya está en uso")
                }
            })
    }

    if (loading) return <h1>Registrando usuario...</h1>

    return (
        <div className="authcontainer">
            <h1>Registrarse</h1>
            <form className="loginform" onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Repetir contraseña" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <button type="onSubmit" onClick={handleSubmit}>Registrarse</button>
                <button onClick={() => { navigate("/auth") }}>Inicio de sesión</button>
            </form>
        </div>
    )
}