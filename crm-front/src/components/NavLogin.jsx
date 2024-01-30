import { Link, useLocation } from "react-router-dom"


const NavLogin = () => {
    const location = useLocation()
    return (
        <nav className="flex justify-between">
            <Link to={location.pathname === '/login' ? "/registrar" : "/login"} className="text-sm font-light p-2 text-center">{location.pathname === '/login' ? "¿No tienes una cuenta? Crear Cuenta" : "¿Ya tienes una cuenta? Inicia Sesion"}</Link>
            <Link to={location.pathname === "/olvide-password" ? "/registrar" : "/olvide-password"} className="text-sm font-light p-2 text-center">{location.pathname === "/olvide-password" ? "¿No tienes una cuenta? Crear Cuenta" : "Olvide Contraseña."}</Link>
        </nav>
    )
}

export default NavLogin