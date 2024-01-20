import { Component, useState } from "react";
import { pedirDatos } from "../utils/utils";

const withProductsData = () => {
    
    const WithProductsData = () => {
        const [productos, setProductos] = useState([])
        const [loading, setLoading] = useState(true)
    
        useEffect(() => {
            setLoading(true)
            pedirDatos()
                .then((data) =>{
                    setProductos(data)
                })
                .finally(() => [
                    setLoading(false)
                ])
        
            },  [])
            return <Component productos={productos} loading={loading}/>
        }
    
        return WithProductsData

};

export default withProductsData