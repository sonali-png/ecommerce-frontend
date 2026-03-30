import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import AccountSidebar from '../components/AccountSidebar'
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductNotFound from '../components/ProductNotFound';

export default function Wishlist() {
  const items = useSelector(state=>state.wishlist.items) || [];
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(`/products/bulk`, {
          ids:items
        });
        setProducts(res.data);
        console.log(`products ${products}`);
      } catch (error) {
        console.error(`error : ${error.message}`);
      }
    };

    if (items.length === 0) {
      setProducts([]);
      return;
    }
    fetchProducts();

  }, [items]);


  return (
    <div className='bgf-account-layout-wrapper'>
        <AccountSidebar />
        { products.length > 0 ?  <ProductList products={products}/> : <ProductNotFound message="Nothing in wishlist" /> }
    </div>
  )
}


