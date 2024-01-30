import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import Cliente from './Cliente'
import DetallesCliente from '../components/DetallesCliente'
import useCliente from '../hooks/useCliente'
import { Suspense } from 'react'


const Index = () => {

    const { auth } = useAuth()
    const { detallesCliente, clientesCargado, clientesMemo } = useCliente()
    if (clientesCargado) return "cargando"

    return (
        <Suspense>
            <div className='lg:flex lg:flex-col relative'>
                <section>
                    <header>
                        <h2 className='text-center m-6 uppercase font-bold text-sky-950 text-xl'>Bienvenido <span className='capitalize text-xl text-gray-700'>{auth.nombre} {auth.apellido}</span></h2>
                    </header>
                    <div>
                        {
                            detallesCliente
                                ?
                                <h3 className='text-center m-3 font-bold text-xl text-gray-700'>Administra tus <span className='text-sky-950'>clientes</span></h3>
                                : <h3>Agrega un nuevo cliente</h3>
                        }
                    </div>
                </section>

                <section className='flex flex-col lg:flex-row justify-center'>
                    <div className=' lg:w-1/2 space-y-8 flex flex-col items-center my-4 md:overflow-y-scroll md:h-screen'>
                        {
                            clientesMemo &&
                            clientesMemo.map(cliente => (
                                <Cliente
                                    key={cliente.id}
                                    cliente={cliente}
                                />
                            ))

                        }
                    </div>
                    <div className={`lg:lg:w-1/2 ${detallesCliente?.nombre ? "block" : "hidden"} lg:block absolute z-40 left-0 top-0 right-0 bottom-0 lg:relative lg:top-0 lg:left-0 opacity lg:bg-transparent flex items-center justify-center`}>
                        {
                            detallesCliente?.nombre
                            &&
                            <DetallesCliente />

                        }

                    </div>

                </section>
            </div>

        </Suspense>
    )
}

export default Index