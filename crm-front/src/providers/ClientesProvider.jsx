import { createContext, useEffect, useState, useMemo } from "react";
import Cookies from 'universal-cookie'

import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";


const cokies = new Cookies()

const ClienteContext = createContext()


const ClienteProvider = ({ children }) => {
    const { auth } = useAuth()
    const [detallesCliente, setDetalleCliente] = useState({})
    const [cliente, setCliente] = useState({})
    const [clientes, setClientes] = useState([])
    const [clienteNoEnontrado, setClienteNoEncontrado] = useState("")
    const [clientesCargado, setClienteCargado] = useState(true)
    const clientesMemo = useMemo(() => clientes, [clientes])
    const [modalEliminar, setModalEliminar] = useState(false)

    const nuevoCliente = async (datos) => {
        try {
            const token = cokies.get('token')
            if (!token) return;

            const { data } = await clienteAxios.post('/inicio/nuevo_cliente', datos, {
                headers: {
                    "Content-Type": "application/json",
                },
                Cookies: token
            })

            setClientes([...clientes, data.cliente])
            return data.msg


        } catch (error) {
            console.log(error)
        }
    }


    const eliminarCliente = async (id) => {
        try {
            const token = cokies.get('token')
            if (!token) return;

            await clienteAxios.delete(`/inicio/cliente/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                Cookies: token
            })

            const clienteEliminado = clientes.filter(cliente => cliente.id !== id)
            setClientes(clienteEliminado)


        } catch (error) {
            console.log(error)
        }
    }

    const mostrarCliente = async (params) => {
        try {
            const token = cokies.get('token')
            if (!token) return;

            const { data } = await clienteAxios(`/inicio/cliente/${params}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                Cookies: token
            })
            return data


        } catch (error) {
            setClienteNoEncontrado(error.response.data.msg)
        }
    }


    const guardarCliente = async (params, datos) => {
        try {
            const token = cokies.get('token')
            if (!token) return;

            const { data } = await clienteAxios.put(`/inicio/cliente/${params}`, datos, {
                headers: {
                    "Content-Type": "application/json",
                },
                Cookies: token
            })
            const clientesActualizados = clientes.map(cliente => cliente.id === data.cliente.id ? data.cliente : cliente)
            setClientes(clientesActualizados)
            return data.msg


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const clientesDetalles = async () => {
            try {
                const token = cokies.get('token')
                if (!token) return;

                const { data } = await clienteAxios('/inicio', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    Cookies: token
                })
                setClientes(data.clientes)
                setClienteCargado(false)

            } catch (error) {
                console.log(error)
            }
        }

        clientesDetalles()

    }, [auth])

    return (
        <ClienteContext.Provider
            value={{
                setDetalleCliente,
                detallesCliente,
                clientesCargado,
                clientes,
                nuevoCliente,
                clientesMemo,
                mostrarCliente,
                eliminarCliente,
                guardarCliente,
                cliente,
                clienteNoEnontrado,
                modalEliminar,
                setModalEliminar
            }}
        >
            {children}
        </ClienteContext.Provider >
    )
}


export {
    ClienteProvider
}

export default ClienteContext