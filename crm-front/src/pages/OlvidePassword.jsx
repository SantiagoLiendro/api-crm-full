import { useState } from "react"

import NavLogin from "../components/NavLogin"
import Error from "../components/Error"
import axios from '../config/axios'
import Sppiner from "../components/Sppiner"

const OlvidePassword = () => {
    const [cargando, setCargando] = useState(false)
    const [msg, setMsg] = useState({})

    const [email, setEmail] = useState("")
    const [msgEmail, setMsgEmail] = useState("")
    const [emailFlotante, setEmailFlotante] = useState(false)

    const fetchOlvidePassword = async (email) => {
        setCargando(true)
        try {
            const { data } = await axios.post('/olvide_password', { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMsg({ msg: data.msg, error: false })
            setCargando(false)

        } catch (error) {
            setMsg({ msg: error.response.data.msg, error: true })
            setCargando(false)
        }
    }

    const handelSubmit = e => {
        e.preventDefault()

        if (!email) {
            setMsgEmail("Campo Obligatorio.")
            return
        }

        fetchOlvidePassword(email)

    }

    return (
        <section className="bg-white border border-gray-300 w-11/12 sm:w-4/6 lg:w-3/6 mx-auto rounded-lg shadow-lg space-y-4">
            <h2 className="text-center text-sky-950 font-bold text-xl p-2">Recuperar Cuenta</h2>
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
                    <p className="text-center text-gray-700 p-2 font-extralight">Completa el formulario para recuperar tu cuenta</p>
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
                            setMsgEmail(email ? "" : "Campo Obligatorio.")
                        }}
                    />
                    <img
                        src="/public/img/error.svg"
                        className={`${msgEmail ? "block" : 'hidden'} w-8 absolute cursor-pointer right-2 top-2`}
                        alt="Error Imagen"
                        onMouseEnter={() => setEmailFlotante(!emailFlotante)}
                        onMouseLeave={() => setEmailFlotante(!emailFlotante)}
                    />
                    <div className={`${emailFlotante ? "absolute z-10" : "hidden"} right-2 top-12`}>
                        <Error
                            mensaje={msgEmail}
                        />
                    </div>
                </div >


                <div className='bg-sky-900'>
                    {
                        cargando ? <div className="p-1">
                            <Sppiner />
                        </div> :
                            <input type="submit" value="Enviar" className='p-3 rounded-b-lg  text-white font-bold w-full uppercase cursor-pointer hover:bg-sky-950' />

                    }
                </div>
            </form >
            <NavLogin />
        </section>
    )
}

export default OlvidePassword