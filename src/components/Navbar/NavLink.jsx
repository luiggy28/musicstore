

const NavLink = ({href, text}) => {

    return (
        <a 
            className="text-black dark:text-white hover:text-sky-800 text-lg uppercase font-semibold" 
            href={href}
        >
            {text}
        </a>
    );
}

export default NavLink