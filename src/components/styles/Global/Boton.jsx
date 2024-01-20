
const Boton = ({ children, onClick }) => {

    return (
    <button
        onClick={onClick}
        className="bg-indigo-600 hover:bg-indigo-800 rounded flex items-center py-2 px-4 text-center text-white font-semibold my-4"
    >
        {children}
    </button>
    );
};

export default Boton;