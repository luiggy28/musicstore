import logo from '../../assets/Logo_Final.png'
import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Boton from "../styles/Global/Boton";


const links = [
    {
        label: 'Inicio',
        href: '/'
    },
    {
        label: 'Estudio',
        href: '/productos/estudio'
    },
    {
        label: 'Micrófonos',
        href: '/productos/microfono'
    },
    {
        label: 'Percusión',
        href: '/productos/percusion'
    },
    {
        label: 'Cuerdas',
        href: '/productos/cuerdas'
    },
    {
        label: 'Teclados',
        href: '/productos/teclados'
    },
    {
        label: 'Vientos',
        href: '/productos/vientos'
    }
]


const Navbar = () => {
    const { user, logout } = useContext(UserContext)

    return (
        <header className=" bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-b-3xl shadow-xl  ">
            <div className="coontainer max-w-7xl m-auto py-6 flex justify-between items-center">
                <img className="" src={ logo } alt="Logo" />

                <nav className="flex gap-4">
                    {links.map((link) => (

                        <NavLink
                        key={link.href}
                        to={link.href}
                        className={({ isActive }) => (
                            `text-lg uppercase font-semibold ${isActive ? "text-indigo-600" : "text-black"}`
                        )}
                        >
                        {link.label}
                        </NavLink>

                    ))}

                    <CartWidget />
                    </nav>

            </div>

            {user.logged && <div className="flex justify-between gap-4 items-center container m-auto max-w-7xl ">
                <p className="text-black font-semibold text-1xl ">Usuario: {user.email}</p>
                <Boton onClick={logout}>Cerrar sesión</Boton>
            </div>}
        </header>
    )
}


export default Navbar
