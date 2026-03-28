import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ProductList(props) {
    const navigate = useNavigate();

  const addToWishlist = (productId) => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login"); // redirect to login page
    } else {
      // Call your API or update state
      console.log("Added to wishlist:", productId);
      // Example: axios.post("/api/wishlist", { productId })
    }
  };

  return (
    <div className='product-list'>
      { 
        props.products.map((prod, index) => (
          <div className='product-dtl-box'>
            <div className='wishlist' onClick={()=>addToWishlist(prod._id)}>
              <FontAwesomeIcon 
                icon={faHeart} 
                style={{fontSize:"1.5rem"}}
              />
            </div>
            <div className='product-img'>
              <img src={prod.images[1]} alt="img"/>
            </div>
            <div className='product-info'>
              <h3>{prod.brand}</h3>
              <p>{prod.name}</p>
              <span>{prod.price}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}
