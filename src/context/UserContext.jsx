import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";


export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        email: null,
        logged: false,
        uid: null
    })

    console.log(user)

    const login = async (values) => {
        if (!values.email || !values.password) {
            Swal.fire('Error', 'Por favor ingresa un correo y/o contraseña válidos', 'error');
        } else {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
            } catch (error) {
                Swal.fire('Error', 'Correo electrónico o contraseña incorrectos', 'error');
            }
        }
    }

    const register = async (values) => {
        if (!values.email || !values.password) {
            Swal.fire('Error', 'Por favor ingresa un correo y/o contraseña válidos', 'error');
        } else {
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password);
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    Swal.fire('Error', 'Este correo electrónico ya está en uso. Por favor, intenta iniciar sesión.', 'error');
                } else {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        }
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            Swal.fire('Éxito', 'Se ha enviado un correo electrónico de restablecimiento de contraseña. Por favor, revisa tu bandeja de entrada.', 'success');
        } catch (error) {
            Swal.fire('Error', 'Ha ocurrido un error al intentar restablecer la contraseña.', 'error');
        }
    }

    const logout = () => {
        signOut(auth)
    }

    const googleLogin = () => {
        signInWithPopup(auth, provider)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("User:" , user)
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                    logged: true
                })
            }
            else {
                setUser({
                    email: null,
                    uid: null,
                    logged: false
                }) 
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{user, googleLogin, login, register, logout}}>
            {children}
        </UserContext.Provider>
    )
}