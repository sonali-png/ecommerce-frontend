import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { addToWishlist, removeFromWishlist} from "../api/wishlist";

export default function ProductList(props) {
  const dispatch = useDispatch();
  const wishlist = useSelector(state=>state.wishlist.items) || [];
  const token = localStorage.getItem("accessToken");
  console.log(`Tokeen in prod list : ${token}`);

  const handleWishlist = async (productId) => {
    const exists = wishlist.length > 0 ? wishlist.includes(productId) : false;
    dispatch(toggleWishlist(productId));
    try {
      if(token){
        if(exists) {
          await removeFromWishlist(productId);
        } else {
          await addToWishlist(productId);
        }
      }
    } catch(error) {
      console.log(`Err : ${error}`);
    }
  }

  return (
    <div className='product-list'>
      { 
        props.products.map((product) => (
          <div className='product-dtl-box'>
            <div className='wishlist' onClick={()=>handleWishlist(product._id)}>
              <FontAwesomeIcon 
                icon={faHeart} 
                style={{fontSize:"1.5rem", color: wishlist.length > 0 && wishlist.includes(product._id) ? "red" : "black"}}
              />
            </div>
            <div className='product-img'>
              <img src={product.images[1]} alt="img"/>
            </div>
            <div className='product-info'>
              <h3>{product.brand}</h3>
              <p>{product.name}</p>
              <span>{product.price}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}
