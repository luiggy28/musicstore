import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../firebase/config";
import { collection, addDoc, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Boton from "../../components/styles/Global/Boton";
import Loader from "../Loader/Loader";

const Checkout = () => {
    const { cart, totalCart, clearCart, discount } = useContext(CartContext);

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        email: "",
    });

    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const orden = {
            cliente: values,
            items: cart,
            total: totalCart() - discount,
            discount: discount,
            fecha: new Date(),
        };

        const ordersRef = collection(db, "orders");

        Promise.all(
            cart.map(item => {
                const docRef = doc(db, 'productos', item.id);
                return getDoc(docRef);
            })
        ).then(docs => {
            const updates = docs.map((docSnapshot, index) => {
                if (!docSnapshot.exists()) {
                    throw new Error(`No se encontró el producto con ID: ${cart[index].id}`);
                }

                const productData = docSnapshot.data();
                if (productData.stock >= cart[index].cantidad) {
                    const newStock = productData.stock - cart[index].cantidad;
                    return updateDoc(doc(db, 'productos', cart[index].id), { stock: newStock });
                } else {
                    throw new Error(`No hay suficiente stock de ${productData.nombre}`);
                }
            });

            Promise.all(updates)
                .then(() => {
                    return addDoc(ordersRef, orden);
                })
                .then((docRef) => {
                    setOrderId(docRef.id);
                    clearCart();
                    Swal.fire("Gracias por tu compra!");
                })
                .catch((error) => {
                    console.error("Error al procesar la compra:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (orderId) {
        return (
            <div className="container m-auto p-10 mt-10 max-w-7xl  bg-white rounded-xl shadow-xl ">
                <div className="m-8">
                    <h2 className="text-4xl m-4 font-semibold">Gracias por tu compra</h2>
                    <hr />
                    <p className="m-4">Tu código de orden es: {orderId}</p>
                    <hr />
                    <Boton><Link to="/">Ir al Inicio</Link></Boton>

                </div>
            </div>
        );
    }

    return (
        <div className="container m-auto mt-10">
            <h2 className="text-4xl font-semibold">Checkout</h2>
            <hr />
            <h4 className="container m-auto mt-4 font-medium ">Completa tus datos:</h4>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-md mt-4"
            >
                <input
                    className="border p-2"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={values.nombre}
                    onChange={handleInputChange}
                    name="nombre"
                />
                <input
                    className="border p-2"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    value={values.apellido}
                    onChange={handleInputChange}
                    name="apellido"
                />
                <input
                    className="border p-2"
                    type="text"
                    placeholder="Ingresa tu dirección"
                    value={values.direccion}
                    onChange={handleInputChange}
                    name="direccion"
                />
                <input
                    className="border p-2"
                    type="email"
                    placeholder="Ingresa tu e-mail"
                    value={values.email}
                    onChange={handleInputChange}
                    name="email"
                />
                <button type="submit" className="bg-blue-500 text-white py-2">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Checkout;