import { Link } from "react-router-dom"

import useCliente from "../hooks/useCliente"
import { useState } from "react"



const DetallesCliente = () => {
    const { detallesCliente, setDetalleCliente, eliminarCliente, modalEliminar, setModalEliminar } = useCliente()

    // const [modalEliminar, setModalEliminar] = useState(false)

    return (
        <div className="absolute h-auto w-9/12 lg:relative lg:w-10/12 mx-auto my-4 bg-gray-200 rounded-lg shadow-lg ">
            <div className="">
                <button
                    className="absolute right-4 top-0 font-black uppercase text-sky-950 text-xl"
                    onClick={() => setDetalleCliente({})}
                >
                    x
                </button>
                <h3 className="text-center text-sky-950 font-bold text-xl py-8">Detalles Clientes</h3>
                <div className="space-y-3">
                    <p className='text-sky-950 font-black px-3'>Nombre: <span className=' font-normal text-gray-900'>{detallesCliente.nombre}</span></p>
                    <p className='text-sky-950 font-black px-3'>Descripcion: <span className=' font-normal text-gray-900'>{detallesCliente.descripcion}</span></p>
                    <p className='text-sky-950 font-black px-3'>Telefono: <span className=' font-normal text-gray-900'>{detallesCliente.telefono ? detallesCliente.telefono : "-"}</span></p>
                    <p className='text-sky-950 font-black px-3'>Email: <span className=' font-normal text-gray-900'>{detallesCliente.email ? detallesCliente.email : "-"}</span></p>


                    <div className="flex px-3 justify-between pb-4">
                        <button
                            className="px-4 py-2 bg-red-600 text-red-100 rounded-sm hover:bg-red-700 hover:text-red-200"
                            onClick={() => {
                                setModalEliminar(true)
                            }}
                        >
                            Eliminar
                        </button>
                        <Link
                            className="px-4 py-2 bg-blue-600 text-blue-100 rounded-sm hover:bg-blue-700 hover:text-blue-200"
                            to={`/editar-cliente/${detallesCliente.id}`}
                            onClick={() => setDetalleCliente({})}
                        >
                            Editar
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`absolute ${modalEliminar ? "block" : "hidden"} top-0 bottom-0 left-0 right-0 z-20 opacity`}>
                <div className="relative bg-gray-700 mx-auto w-3/4 top-20 flex flex-col space-y-3 rounded-lg p-2">
                    <p className="text-center p-2 text-white font-bold">¿Eliminar registro?</p>
                    <div className="flex justify-between p-2">
                        <button
                            className="px-4 py-2 bg-red-600 text-red-100 rounded-sm hover:bg-red-700 hover:text-red-200"
                            onClick={() => {
                                eliminarCliente(detallesCliente.id)
                                setDetalleCliente({})
                            }}
                        >
                            Aceptar
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-blue-100 rounded-sm hover:bg-blue-700 hover:text-blue-200"
                            onClick={() => setModalEliminar(!modalEliminar)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallesCliente