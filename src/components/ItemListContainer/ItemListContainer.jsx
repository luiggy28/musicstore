import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemListContainer = () => {
const [productos, setProductos] = useState([])
const [loading, setLoading] = useState(true)

const { categoryId } = useParams()

useEffect(() => {
    setLoading(true)

    const productosRef = collection(db, 'productos')
    const docsRef = categoryId
                        ? query( productosRef, where('category', '==', categoryId))
                        : productosRef

    getDocs(docsRef)
        .then((querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => {
            return {
            ...doc.data(),
            id: doc.id
            }
        })
        
        console.log( docs )
        setProductos( docs )
        })
        .finally(() => setLoading(false))

}, [categoryId])

return (
    <>
    {
        loading
        ? <Loader/>
        : <ItemList productos={productos}/>
    }
    </>
)
};

export default ItemListContainer;