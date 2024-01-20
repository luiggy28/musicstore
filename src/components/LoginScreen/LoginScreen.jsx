import { useContext, useState } from "react";
import "./LoginScreen.scss";
import { UserContext } from "../../context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const LoginScreen = () => {
const { login, register, googleLogin } = useContext(UserContext);

const [values, setValues] = useState({
    email: "",
    password: "",
});

const handleInputChange = (e) => {
    setValues({
    ...values,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    login(values);
};

return (
    <div className="login-container">
    <div className="p-8 rounded-xl bg-gray-100 shadow-2xl ">
        <h2 className="text-2xl font-semibold w-80">
            Inicio de sesión
        </h2>
        <hr />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
            className="border p-2"
            type="email"
            placeholder="Ingresa tu email"
            value={values.email}
            onChange={handleInputChange}
            name="email"
        />
        <input
            className="border p-2"
            type="password"
            placeholder="Ingresa tu password"
            value={values.password}
            onChange={handleInputChange}
            name="password"
        />

        <button type="submit" className=" rounded bg-indigo-600 hover:bg-indigo-800 text-white py-2 shadow-sm ">
            Ingresar
        </button>
        </form>

        <div className=" flex justify-between ">
            <button
            onClick={() => register(values)}
            className=" rounded bg-indigo-600 hover:bg-indigo-800 text-white p-2 mt-4 shadow-sm ">
                Registrarme
            </button>
            <button
                onClick={() => resetPassword(values.email)}
                className=" rounded bg-red-300 hover:bg-red-500 text-white p-2 mt-4 shadow-sm ">
                Restablecer contraseña
            </button>
        </div>
        <div className=" flex flex-col ">
            <button
            onClick={googleLogin}
            className=" rounded bg-indigo-600 hover:bg-indigo-800 text-white p-2 mt-4 shadow-sm ">
                Iniciar sesión con Google
            </button>
        </div>
    </div>
    </div>
);
};

export default LoginScreen;