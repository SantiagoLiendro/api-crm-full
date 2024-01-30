import useCliente from "../hooks/useCliente"
import { formatearFecha } from "../helpers"


const Cliente = ({ cliente }) => {
    const { setDetalleCliente, detallesCliente } = useCliente()


    return (
        <div
            className=' p-4 bg-gray-200 shadow-xl rounded-lg w-10/12 cursor-pointer'
            onClick={() => setDetalleCliente(cliente)}
        >
            <p className='text-sky-950 font-black'>Nombre: <span className=' font-normal text-gray-900'>{cliente.nombre}</span></p>
            <p className='text-sky-950 font-black whitespace-nowrap overflow-hidden text-ellipsis'>Descripcion: <span className='font-normal text-gray-900'>{cliente.descripcion}</span></p>
            <p className='text-sky-950 font-black'>Telefono: <span className='font-normal text-gray-900'>{cliente.telefono ? cliente.telefono : "-"}</span></p>
            <p className='text-sky-950 font-black'>Email: <span className='font-normal text-gray-900'>{cliente.email ? cliente.email : "-"}</span></p>

        </div>
    )
}

export default Cliente