import { useNavigate } from 'react-router-dom'
import { useState } from "react"

import useCliente from "../hooks/useCliente"


const Formulario = () => {
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")

    const [msg, setMsg] = useState({})

    const { nuevoCliente } = useCliente()

    const handelSubmit = async (e) => {
        e.preventDefault()

        if ([nombre, descripcion, telefono, email].includes("")) {
            setMsg({ msg: "Todos los campos son obligatorios.", error: true })
            return
        }
        const mensaje = await nuevoCliente({ nombre, descripcion, telefono, email })
        setMsg({ msg: mensaje, error: false })

        setNombre("")
        setDescripcion("")
        setTelefono("")
        setEmail("")

        setTimeout(() => navigate('/'), 2000)
    }

    return (
        <>
            <h2 className='text-center mb-6 text-sky-950 uppercase font-bold text-xl'>Nuevo Cliente</h2>
            <form
                className='bg-white border border-gray-300 w-4/6 md:w-3/6 mx-auto rounded-lg shadow-lg space-y-3'
                onSubmit={handelSubmit}
            >
                {
                    msg?.msg ?
                        <div className={`flex items-center rounded-t-lg justify-between ${msg.error ? "text-red-700 bg-red-300" : "text-green-700 bg-green-300"}`}>
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
                        <p className='text-center p-3'>Completa el formulario para agregar un nuevo cliente</p>

                }
                <div>
                    <label htmlFor="nombre" className='block p-3 font-light text-lg '>Nombre</label>
                    <input
                        value={nombre}
                        type="text" id='nombre'
                        placeholder='Nombre'
                        className=' placeholder:font-bold w-full p-3'
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className='block p-2 font-light text-lg '>Descripcion</label>
                    <textarea
                        value={descripcion}
                        name=""
                        id="descripcion"
                        cols="10"
                        rows="10"
                        placeholder='Descripcion del cliente'
                        className=' placeholder:font-bold w-full p-3 h-36'
                        onChange={e => setDescripcion(e.target.value)}
                    ></textarea>

                </div>

                <div>
                    <label htmlFor="telefono" className='block p-3 font-light text-lg '>Telefono</label>
                    <input
                        value={telefono}
                        type="number"
                        id='telefono'
                        placeholder='Telefono del cliente'
                        className='placeholder:font-bold w-full p-3'
                        onChange={e => setTelefono(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className='block p-3 font-light text-lg '>Correo Electronico</label>
                    <input
                        value={email}
                        type="email"
                        id='email'
                        placeholder='Correo electronico del cliente'
                        className='placeholder:font-bold w-full p-3'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className=' '>
                    <input type="submit" value="Nuevo Cliente" className='p-3 rounded-b-lg bg-sky-900 text-white font-bold w-full uppercase cursor-pointer hover:bg-sky-950' />
                </div>

            </form>
        </>
    )
}

export default Formulario