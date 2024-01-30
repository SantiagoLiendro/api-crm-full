import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import NavLogin from "../components/NavLogin"
import Sppiner from "../components/Sppiner"
import useAuth from '../hooks/useAuth'
import clienteAxios from "../config/axios"


const Login = () => {
    const navigate = useNavigate()
    const [msg, setMsg] = useState({})
    const [cargando, setCargando] = useState(false)

    const [password, setPassword] = useState("")
    const [verPassword, setVerPassword] = useState(false)

    const [email, setEmail] = useState("")


    const { setAuth, setCheckAuto } = useAuth()

    const authSession = async (datos) => {

        try {

            const { data } = await clienteAxios.post('/iniciar_sesion', datos, {
                headers: {
                    "Content-Type": "application/json",
                },

            })
            setAuth(data.usuario)
            setCheckAuto(true)
            setCargando(false)
            navigate("/")

        } catch (error) {
            setMsg({ msg: error.response.data.msg, error: true })
            setCargando(false)
        }
    }


    const handelSubmit = e => {
        e.preventDefault()

        if ([email, password].includes("")) {
            setMsg({ msg: "Todos los campos son obligatorios.", error: true })
            return
        }
        setCargando(true)
        authSession({ email, password })

    }

    return (
        <section className="bg-white border border-gray-300 w-11/12 sm:w-4/6 lg:w-3/6 mx-auto rounded-lg shadow-lg space-y-4">
            <h2 className="text-center text-sky-950 font-bold text-xl p-2">Inicia Sesion</h2>
            {
                msg?.msg ?
                    <div className={`flex items-center justify-between ${msg.error ? "text-red-700 bg-red-300" : "text-green-700 bg-green-300"}`}>
                        <p></p>
                        <p className={`text-center p-2 font-extralight`}>{msg.msg}</p>
                        <p
                            className="font-bold mr-2 text-xl cursor-pointer"
                            onClick={() => setMsg({})}
                        >
                            X
                        </p>
                    </div>
                    :
                    <p className="text-center text-gray-700 p-2 font-extralight">Completa el formulario para iniciar sesion</p>
            }

            <form
                className='space-y-3'
                onSubmit={handelSubmit}
            >

                <div className="relative">
                    <input
                        type="text"
                        id='email'
                        placeholder='Correo electronico'
                        className='placeholder:text-2xl w-full p-3'
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}

                    />
                </div >

                <div className="relative">

                    <input
                        type={verPassword ? "text" : "password"}
                        id='password'
                        placeholder='Contaseña'
                        className='placeholder:text-2xl w-full p-3'
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    />
                    <img
                        src="/public/img/ojo.svg"
                        className="absolute w-8 right-2 top-2 cursor-pointer"
                        onClick={() => setVerPassword(!verPassword)}
                    />
                </div>

                <div className='bg-sky-900'>
                    {
                        cargando ? <div className="p-1">
                            <Sppiner />
                        </div> :
                            <input type="submit" value="Iniciar Sesion" className='p-3 rounded-b-lg  text-white font-bold w-full uppercase cursor-pointer hover:bg-sky-950' />

                    }
                </div>
            </form >
            <NavLogin />
        </section>

    )
}

export default Login