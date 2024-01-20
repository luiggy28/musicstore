import { useState, useContext } from "react";
import Boton from "../styles/Global/Boton";
import QuantitySelector from "./QuantitySelector";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ItemDetail = ({ item }) => {
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(1);
    const { addToCart, isInCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(true);

    const handleAgregar = () => {
        if (item.stock <= 0) {
            return;
        }

        const itemToCard = {
            ...item,
            cantidad,
        };

        addToCart(itemToCard);
    };

    const handleVolver = () => {
        navigate(-1);
    };

    const handleInicio = () => {
        navigate("/");
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto m-2 p-2 mt-8">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className=" justify-items-center m-2 p-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="container m-2 my-8">
                                <Boton onClick={handleVolver}>Volver</Boton>
                                <h3 className="text-2xl font-semibold">{item.name}</h3>
                                <hr />
                                <div className="grid grid-flow-row justify-items-center gap-4 pt-2 ">
                                    <img className="size-60" src={item.img} alt={item.name} />

                                    <div>
                                        <div>
                                            <h2 className="  font-semibold text-2xl text-justify ">Descripción: </h2>
                                            <p>{item.description}</p>
                                        </div>
                                        <br />
                                        <p className="text-xl font-bold">Precio: {item.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} clp</p>
                                        <br />

                                        {
                                            isInCart(item.id)
                                                ? <>
                                                    <Boton><Link to="/cart">Terminar compra</Link></Boton>
                                                    <Boton onClick={handleInicio}>Seguir comprando</Boton>
                                                </>
                                                : item.stock > 0 ? (
                                                    <>
                                                        <QuantitySelector
                                                            cantidad={cantidad}
                                                            stock={item.stock}
                                                            setCantidad={setCantidad}
                                                        />
                                                        <br />
                                                        <Boton onClick={handleAgregar}>Agregar al carrito</Boton>
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <br />
                                                        <p className="text-xl text-red-600 font-bold">Producto no disponible</p>
                                                        <p className="text-xl text-black font-semibold">Te invitamos a seguir comprando</p>
                                                        <br />
                                                        <Boton><Link to="/">Ver más productos</Link></Boton>
                                                    </>
                                                )
                                        }

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemDetail;