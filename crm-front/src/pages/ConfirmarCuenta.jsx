import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NavLogin from '../components/NavLogin'
import useAuth from '../hooks/useAuth'

const ConfirmarCuenta = () => {
    const [respuesta, setRespuesta] = useState("")

    const { token } = useParams()
    const { confirmarCuenta } = useAuth()

    useEffect(() => {
        const confirmar = async () => {
            const respuesta = await confirmarCuenta(token)
            setRespuesta(respuesta)
        }
        confirmar()
    }, [])


    return (
        <div className="w-4/6 md:w-6/12 mx-auto bg-gray-100 h-32 rounded-lg shadow-md flex flex-col gap-8 items-center justify-center">
            <p className={`${respuesta.error ? "bg-red-700 text-red-100" : "bg-green-700 text-green-100"} w-full text-center p-2`}> {respuesta.msg}</p>
            <NavLogin />
        </div>
    )
}

export default ConfirmarCuenta 