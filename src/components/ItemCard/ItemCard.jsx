import { Link } from "react-router-dom";
import Boton from "../styles/Global/Boton";
import { useState } from 'react';


const ItemCard = ({item}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <article className="w-80 bg-gray-100 rounded-xl m-2 p-4 shadow-lg ">
            <img className="size-64 m-auto p-1 " src={item.img} alt={item.name} />
            <h3 className="text-2xl font-semibold overflow-hidden whitespace-nowrap">{item.name}</h3>
            <hr />
            <p style={{ 
                overflow: 'hidden',
                height: isExpanded ? 'auto' : '3rem',
                lineHeight: '1.5rem'
                }}>{item.description}
                </p>
            <a className="text-gray-600 font-semibold " href="#" onClick={(e) => 
                { e.preventDefault();
                setIsExpanded(!isExpanded);
                }}>
            
            {isExpanded 
                ? 'Ver menos'
                : 'Ver más...'}
            </a>
            {
                item.stock === 0
                    ? <p className="font-bold text-red-500">Producto agotado</p>
                    : item.stock <= 8 && <p className="font-bold text-red-500">¡Últimas {item.stock} unidades!</p> 
            }

            <p className="text-xl font-bold">Precio: {item.price.toLocaleString('es-CL',
            { style: 'currency', currency: 'CLP' })} clp
            </p>

            <Boton>
                <Link to={`/item/${item.id}`}>Ver más</Link>
            </Boton>
        </article>
    );
};

export default ItemCard;