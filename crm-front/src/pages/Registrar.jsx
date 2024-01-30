import clienteAxios from "../config/axios"
import { useState } from "react"
import NavLogin from "../components/NavLogin"
import ImagenError from '../../public/img/error.svg'
import OjoPng from '../../public/img/ojo.svg'
import Error from "../components/Error"
import Sppiner from '../components/Sppiner'


const Registrar = () => {
    const validarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validarPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    const [cargando, setCargando] = useState(false)
    const [msg, setMsg] = useState({})

    const [nombre, setNombre] = useState("")

    const [apellido, setApellido] = useState("")

    const [email, setEmail] = useState("")
    const [msgEmail, setMsgEmail] = useState("")
    const [emailFlotante, setEmailFlotante] = useState(false)

    const [password, setPassword] = useState("")
    const [msgPassword, setMsgPassword] = useState("")
    const [passwordFlotante, setPasswordFlotante] = useState(false)
    const [verPassword, setVerPassword] = useState(false)

    const [repetirPassword, setRepetirPassword] = useState("")
    const [msgRepetirPassword, setMsgRepetirPassword] = useState("")
    const [repetirPasswordFlotante, setRepetirPasswordFlotante] = useState(false)
    const [verRepetirPassword, setVerRepetirPassword] = useState(false)


    const usuarioNuevo = async (datos) => {
        setCargando(true)
        try {
            const { data } = await clienteAxios.post('/crear_usuario', datos, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMsg({ msg: data.msg, error: false })
            setCargando(false)
            setNombre("")
            setApellido("")
            setEmail("")
            setPassword("")
            setRepetirPassword("")
        } catch (error) {
            setCargando(false)
            setMsgEmail(error.response.data.msg)
        }

    }

    const handelSubmit = async (e) => {
        e.preventDefault()

        if ([nombre, apellido, email, password, repetirPassword].includes("")) {
            setMsg({ msg: "Todos los campos son obligatorios.", error: true })
            return
        };

        if (repetirPassword !== password) {
            setMsgRepetirPassword("Las contraseñas no son iguales.")
            return
        } else {
            setMsgRepetirPassword("")
        }


        await usuarioNuevo({ nombre, apellido, email, password })

    }

    return (
        <section className="bg-white border border-gray-300 w-11/12 sm:w-4/6 lg:w-3/6 mx-auto rounded-lg shadow-lg space-y-2">

            <h2 className="text-center text-sky-950 font-bold text-xl p-2">Crear Cuenta</h2>
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
                    <p className="text-center text-gray-700 p-2 font-extralight">Completa el formulario para crear una cuenta</p>

            }
            <form
                className=' space-y-1'
                onSubmit={handelSubmit}
            >

                <div className="relative">
                    <label
                        htmlFor="nombre"
                        className='block p-2 font-light'
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id='nombre'
                        placeholder='Tu Nombre'
                        className='placeholder:text-xl w-full p-2'
                        value={nombre}
                        onChange={e => {
                            setNombre(e.target.value)
                        }}

                    />

                </div >

                <div className="relative">
                    <label htmlFor="apellido" className='block p-2 font-light  '>Apellido</label>
                    <input
                        type="text"
                        id='apellido'
                        placeholder='Tu Apellido'
                        className='placeholder:text-xl w-full p-2'
                        value={apellido}
                        onChange={e => {
                            setApellido(e.target.value)
                        }}

                    />

                </div>

                <div className="relative">
                    <label htmlFor="email" className='block p-2 font-light  '>Correo Electronico</label>
                    <input
                        type="text"
                        id='email'
                        placeholder='Correo electronico'
                        className='placeholder:text-xl w-full p-2'
                        value={email}
                        onInput={e => {
                            setEmail(e.target.value)
                            setMsgEmail(!validarEmail.test(email) ? "Formato no valido." : "")
                        }}

                    />
                    <img
                        src="/public/img/error.svg"
                        className={`${msgEmail ? "block" : 'hidden'} w-8 absolute cursor-pointer right-2 top-11`}
                        alt="Error Imagen"
                        onMouseEnter={() => setEmailFlotante(!emailFlotante)}
                        onMouseLeave={() => setEmailFlotante(!emailFlotante)}
                    />
                    <div className={`${emailFlotante ? "absolute" : "hidden"} right-2 top-20`}>
                        <Error
                            mensaje={msgEmail}
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="password" className='block p-2 font-light '>Contraseña</label>
                    <input
                        type={verPassword ? "text" : "password"}
                        id='password'
                        placeholder='Contaseña'
                        className='placeholder:text-xl w-full p-2'
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                            setMsgPassword(!validarPassword.test(password) ? "La contraseña debe contener 8 digitos, entre minusculas mayusculas y numeros." : "")
                        }}

                    />
                    <img
                        src="/public/img/ojo.svg"
                        alt="Imagen Ojo ver Password"
                        className="absolute w-8 right-2 top-11 cursor-pointer"
                        onClick={() => setVerPassword(!verPassword)}
                    />
                    <img
                        src="/public/img/error.svg"
                        className={`${msgPassword ? "block" : 'hidden'} w-8 absolute cursor-pointer right-12 top-11`}
                        alt="Error Imagen"
                        onMouseEnter={() => setPasswordFlotante(!passwordFlotante)}
                        onMouseLeave={() => setPasswordFlotante(!passwordFlotante)}
                    />
                    <div className={`${passwordFlotante ? "absolute z-10" : "hidden"} right-2 top-20`}>
                        <Error
                            mensaje={msgPassword}
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="repetir-password" className='block p-2 font-light  '>Repetir Contraseña</label>
                    <input
                        type={verRepetirPassword ? "text" : "password"}
                        id='repetir-password'
                        placeholder='Repetir Contaseña'
                        value={repetirPassword}
                        className='placeholder:text-xl w-full p-2'
                        onChange={e => setRepetirPassword(e.target.value)}

                    />
                    <img
                        src="/public/img/ojo.svg"
                        alt="Imagen Ojo ver Password"
                        className="absolute w-8 right-2 top-11 cursor-pointer"
                        onClick={() => setVerRepetirPassword(!verRepetirPassword)}
                    />
                    <img
                        src="/public/img/error.png"
                        className={`${msgRepetirPassword ? "block" : 'hidden'} w-8 absolute cursor-pointer right-12 top-11`}
                        alt="Error Imagen"
                        onMouseEnter={() => setRepetirPasswordFlotante(!repetirPasswordFlotante)}
                        onMouseLeave={() => setRepetirPasswordFlotante(!repetirPasswordFlotante)}
                    />

                    <div className={`${repetirPasswordFlotante ? "absolute z-10" : "hidden"} right-2 top-20`}>
                        <Error
                            mensaje={msgRepetirPassword}
                        />
                    </div>
                </div>

                <div className='bg-sky-900'>
                    {
                        cargando ? <div className="p-1">
                            <Sppiner />
                        </div> :
                            <input type="submit" value="Crear Cuenta" className='p-3 rounded-b-lg  text-white font-bold w-full uppercase cursor-pointer hover:bg-sky-950' />


                    }
                </div>
            </form >
            <NavLogin />

        </section >

    )
}

export default Registrar