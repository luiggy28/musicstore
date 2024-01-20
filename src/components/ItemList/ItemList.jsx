import ItemCard from "../ItemCard/ItemCard";
import { useParams } from "react-router-dom";


const ItemList = ({productos}) => {
    const { categoryId } = useParams()
    const capitalizarPalabras = (str) => {
        return str.split(' ').map(palabra => 
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        ).join(' ');
    }

    return (
        <section className="container m-auto mt-8">
            <h2 className="text-4xl font-bold m-6">
            {!categoryId ? "Todos los productos" : capitalizarPalabras(categoryId)}</h2>
            <hr />

            <div className="flex flex-wrap justify-between m-2 p-2 gap-4 items-stretch">
                { productos.map ((item) => <ItemCard key={item.id} item={item} />)}
            </div>
        </section>
    )
};

export default ItemList;