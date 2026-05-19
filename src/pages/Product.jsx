import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ProductNotFound from "../components/ProductNotFound";
import "../css/layout.css";
import "../css/loader.css";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const ProductList = lazy(() => import('../components/ProductList'));

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/products');

            if (
                typeof response.data.productList !== "undefined" &&
                response.data.productList.length > 0
            ) {
                setProducts(response.data.productList);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.log("Error while fetching products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bgf-wrapper">
            <Sidebar />
            {
                loading ? (
                    <div className="page-loader">
                        <div className="spinner"></div>
                    </div>
                ) : products.length > 0 ? (
                    <Suspense fallback={<div>Loading products...</div>}>
                        <ProductList products={products} />
                    </Suspense>
                ) : (
                    <ProductNotFound />
                )
            }
        </div>
    );
}