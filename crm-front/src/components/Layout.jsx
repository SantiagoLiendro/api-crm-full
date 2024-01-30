import { Suspense } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import Navegacion from './Navegacion'
import useAuth from '../hooks/useAuth'


const Layout = () => {
    const { cargando, authMemo, auth } = useAuth()

    if (cargando) return "cargando..."

    return (
        <>
            <div className='md:flex md:min-h-screen'>
                <div className=" inline w-full md:w-2/6 lg:w-3/12 md:absolute h-screen bottom-0 ">
                    <aside className='bg-sky-950 h-full'>
                        <h1 className='text-2xl text-center py-6 text-white font-extrabold'>CRM <span className='text-bold text-gray-300'>Practica</span></h1>

                        <Navegacion />
                    </aside >

                </div>



                {

                    auth?.nombre ? (
                        <Suspense>

                            <main className='md:w-4/6 lg:w-9/12 md:h-screen md:overflow-scroll md:absolute md:right-0'>
                                <Outlet />
                            </main>
                        </Suspense>
                    ) :
                        <Navigate to="/login" />
                }






            </div>
        </>
    )

}
export default Layout