import { useEffect, useState } from "react"
import clienteAxios from '../config/axios'
import Cookies from 'universal-cookie'

const cokies = new Cookies()

const Perfil = () => {
    const [perfil, setPerfil] = useState({})

    useEffect(() => {
        const consultarPefil = async () => {
            try {
                const token = cokies.get('token')
                if (!token) return;

                const { data } = await clienteAxios('/inicio/perfil', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    Cookies: token
                })

                setPerfil(data)
                return

            } catch (error) {
                console.log(error.response.data)
            }
        }

        consultarPefil()
    }, [])

    console.log(perfil)

    return (
        <div className="container mx-auto mt-6">
            Perfil

            <div>
                <p>{perfil.nombre}</p>
                <p>{perfil.apellido}</p>
            </div>
        </div>
    )
}

export default Perfil