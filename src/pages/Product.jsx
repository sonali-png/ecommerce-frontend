import {useEffect, useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import ProductNotFound from "../components/ProductNotFound";
import "./layout.css";

export default function Product() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                if(typeof response.data.productList !== "undefined" && response.data.productList.length > 0) {
                    setProducts(response.data.productList);
                }
            } catch (error) {
                console.log(`Error while fetching products`);
            }
        }
        fetchProducts();
    }, []);
    return (
        <>
            <div className="bgf-wrapper">
                <Sidebar />
                { products.length > 0 ?  <ProductList products={products}/> : <ProductNotFound /> }
            </div>
        </>
    );
    
} 