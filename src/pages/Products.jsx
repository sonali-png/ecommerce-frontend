import { useEffect, useState, Suspense, useRef, useCallback  } from "react";
import ProductNotFound from "../components/ProductNotFound";
import ProductListing from "../components/ProductListing.jsx"
import userApi from "../api/userApi.js";
import { useSearchParams } from 'react-router-dom';
import ProductLoader from "../components/Loader";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Product() {
    const [searchParams] = useSearchParams();
    const queryString = searchParams.toString();
    
    // States
    const [loading, setLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Keeps track of scroll loading state
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ nextCursor: null, hasMore: true });
    const [initialLoaded, setInitialLoaded] = useState(false);

    // Intersection Observer ref
    const observer = useRef();
    const fetchingRef = useRef(false);

    // 1. Core Fetch Function
    const fetchProducts = useCallback(async (cursor = null, isInitialLoad = false) => {
        if (isInitialLoad) {
            setLoading(true);
            setInitialLoaded(true);
        } else {
            setIsFetchingMore(true);
        }

        try {
            if (fetchingRef.current) return;

            fetchingRef.current = true;

            let url = `/filter/products?${queryString}&limit=6`;

            if (cursor) {
                url += `&cursor=${cursor}`;
            }

            const { data } = await userApi.get(url);
            console.log(data);

            await sleep(1000);

            const newProducts = data.products || data;

            setProducts(prev =>
                isInitialLoad
                    ? newProducts
                    : [...prev, ...newProducts]
            );

            setPagination({
                nextCursor: data.pagination?.nextCursor || null,
                hasMore:
                    data.pagination?.hasMore ??
                    (newProducts.length > 0 &&
                        !!data.pagination?.nextCursor)
            });

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
            fetchingRef.current = false;
        }
    }, [queryString]);

    // 2. Trigger on search filter changes
    useEffect(() => {
        fetchProducts(null, true); // Reset to page 1 on search parameter change
    }, [fetchProducts]);

    // 3. Observer callback to detect the end of the scroll list
    const lastProductRef = useCallback((node) => {
        if (
            loading ||
            isFetchingMore ||
            !pagination.hasMore ||
            !initialLoaded
        ) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    pagination.nextCursor
                ) {
                    fetchProducts(
                        pagination.nextCursor,
                        false
                    );
                }
            },
            {
                rootMargin: "300px"
            }
        );

        if (node) {
            observer.current.observe(node);
        }
    }, [
        loading,
        isFetchingMore,
        pagination,
        initialLoaded,
        fetchProducts
    ]);

    return (
        <div className="bgf-wrapper">
            {
                loading ? (
                    <div className="page-loader">
                        <div className="spinner"></div>
                    </div>
                ) : products.length > 0 ? (
                    <Suspense fallback={<div>Loading products...</div>}>
                        {/* Pass the target ref tracker down to the listing layout */}
                        <ProductListing products={products} lastProductRef={lastProductRef} />
                        
                        {/* Mini loader showing at the bottom during scroll pagination fetches */}
                        {isFetchingMore && <ProductLoader />}
                    </Suspense>
                ) : (
                    <ProductNotFound />
                )
            }
        </div>
    );
}
