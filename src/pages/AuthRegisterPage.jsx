import React, { useContext, useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useFirestore } from "../hooks/useFirestore";
import { User } from "../models/classes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function AuthRegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [telefono, setTelefono] = useState("")
    const [loading, setLoading] = useState(false)
    const { setUserEmail, setIsLogged } = useContext(AuthContext)
    const { addUser } = useFirestore()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password || !verifyPassword || !nombre || !apellidos || !telefono) {
            alert("Debe rellenar todos los campos para poder registrarse")
            return
        }
        if (password != verifyPassword) {
            alert("Los dos campos de contraseña no coinciden")
            return
        }

        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password).then(() => {
            const user = new User(email, nombre, apellidos, telefono)
            addUser(user).then(() => {
                signInWithEmailAndPassword(auth, email, password).then(() => {
                    setUserEmail(email)
                    setIsLogged(true)
                    navigate("/home")
                }).catch((e) => {
                    console.error(e)
                    alert("Error iniciando sesión")
                })
            }).catch((e) => {
                console.error(e)
                alert("Error añadiendo datos del usuario a la base de datos")
            })

        }).catch((e) => {
            console.error(e)
            alert("Error creando el usuario, el email podría estar en uso")
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