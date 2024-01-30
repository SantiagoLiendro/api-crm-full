import { createContext, useEffect, useState, useMemo } from "react";
import Cookies from 'universal-cookie'

import clienteAxios from "../config/axios";


const cokies = new Cookies()

const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [msg, setMsg] = useState({})
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const [checkAuth, setCheckAuto] = useState(true)
    const authMemo = useMemo(() => ({ auth }), [auth])


    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = cokies.cookies.token

            if (!token) {
                setCargando(false)
                setCheckAuto(false)
                return
            }

            try {
                const { data } = await clienteAxios('/inicio', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    Cookies: token
                })
                setAuth(data.usuario)
                setCargando(false)
                setCheckAuto(false)

            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        cokies.remove('token')
        setAuth({})
    }

    const confirmarCuenta = async (token) => {
        try {
            const { data } = await clienteAxios(`/confirmar_cuenta/${token}`)
            return data

        } catch (error) {
            return {
                msg: error.response.data.msg, error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                msg,
                cargando,
                setCargando,
                setMsg,
                auth,
                setAuth,
                setCheckAuto,
                checkAuth,
                authMemo,
                cerrarSesion,
                confirmarCuenta

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext