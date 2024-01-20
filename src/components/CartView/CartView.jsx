import React, { useContext, useState, useEffect} from "react";
import { CartContext } from "../../context/CartContext";
import Boton from "../styles/Global/Boton";
import trashIcon from "../../assets/trash.svg";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import EmtpyCart from "./EmpyCart";
import Swal from "sweetalert2";

const CartView = () => {
    const { cart, totalCart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    if (!user.email) return <h2>No hay usuario registrado</h2>
    if (cart.length === 0) return <EmtpyCart />

    const applyPromoCode = () => {
        setIsLoading(true);
        if (promoCode.toUpperCase() === 'CODEPRUEBA') {
            setDiscount(totalCart() * 0.1);
            setIsLoading(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Código inválido',
            });
            setIsLoading(false);
        }
    }

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value.toUpperCase());
    };

    const handleRemovePromoCode = () => {
        setPromoCode('');
        setDiscount(0);
    };
    
    return (
        <section className="container m-auto mt-8 mb-8 p-4 max-w-7xl  bg-white rounded-xl shadow-xl ">
    
            <h2 className="text-4xl font-semibold m-4 p-4 ">Tu Compra</h2>
            <hr />

            <ul>
                {cart.map((item) => (
                <li key={item.id} className="flex gap-3 border-b my-4 font-semibold ">
                    <img src={item.img} alt="Cart img" className="size-36 bg-white rounded-md" />
                    <div>
                    <h3 className="text-2xl">{item.name}</h3>
                    <p className="text-2xl font-bold">
                        <span className=" text-gray-500 font-semibold text-sm ">{item.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} clp. (Valor Unitario)</span>
                        <hr />{(item.price * item.cantidad).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} clp. <span className="text-sm flex " >(Valor Total)</span>
                    </p>
                    <hr />
                    <p>Cantidad: {item.cantidad}</p>

                    <Boton onClick={clearCart} >
                        <img src={trashIcon}  className="w-4" alt="trash icon" />
                    </Boton>
                    </div>
                </li>
                ))}
            </ul>

            <section className="max-w-3xl mx-auto m-4 p-4 bg-slate-100 rounded-xl shadow-xl ">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-medium">Sumatoria:</p>
                    <p>{totalCart().toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                </div>
                <hr />            
                {<div className="flex justify-between items-center mb-4 gap-4">
                    <p className="text-2xl font-medium ">Código promocional:</p>
                    <input className="border m-2 p-2 rounded-lg " type="text" placeholder="ingresa: CODEPRUEBA" value={promoCode} onChange={handlePromoCodeChange} />
                    <Boton className=" gap-2 text-sm " onClick={applyPromoCode} disabled={isLoading}>
                        {isLoading ? 'Aplicando...' : 'Aplicar'}
                    </Boton>
                    <hr />
                    <Boton className=" gap-2 text-sm " onClick={handleRemovePromoCode} disabled={isLoading}>
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </Boton>
                </div>}
                <hr />
                {<div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-medium">Descuento:</p>
                    <p>{discount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                </div>}
                <hr />
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-medium">Total a pagar:</p>
                    <p>{(totalCart() - discount).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                </div>
            </section>
                
            
            <div className="flex justify-center gap-12 " >
                <Boton onClick={clearCart}>Vaciar carrito</Boton>
                <Boton ><Link to="/checkout">Finalizar mi compra</Link></Boton>
                <Boton><Link to="/">Continuar comprando</Link></Boton>
            </div>
        </section>
    );
};

export default CartView;