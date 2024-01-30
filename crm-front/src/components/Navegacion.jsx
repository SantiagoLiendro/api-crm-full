import { useNavigate, NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"



const Navegacion = () => {
    const { cerrarSesion } = useAuth()
    const navigate = useNavigate()

    return (

        <nav className='flex flex-col md:relative top-0 bottom-0 items-center gap-4 p-6' id="">
            <NavLink
                to="/"
                className={({ isActive, isPending, isTransitioning, }) =>
                    [
                        isPending ? " " : " p-1 hover:bg-gray-200 hover:text-sky-950 w-full text-center text-white font-bold text-xl",
                        isActive ? "bg-gray-200 w-full text-center p-1 font-bold text-xl text-sky-800 " : "",
                        isTransitioning ? "" : "",
                    ].join(" ")
                }

            >
                Inicio
            </NavLink>
            <NavLink
                to="/clientes"
                className={({ isActive, isPending, isTransitioning, }) =>
                    [
                        isPending ? "" : " p-1 hover:bg-gray-200 hover:text-sky-950 w-full text-center text-white font-bold text-xl",
                        isActive ? "bg-gray-200 w-full text-center p-1 font-bold  text-sky-800" : "",
                        isTransitioning ? "" : "",
                    ].join(" ")
                }
            >
                Clientes
            </NavLink>

            <button
                className="text-white font-bold"
                onClick={() => {
                    cerrarSesion()
                    navigate('/login')
                }}
            >
                Cerrar Sesion
            </button>
        </nav >

    )
}

export default Navegacion