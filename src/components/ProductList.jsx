import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { addToWishlist, removeFromWishlist} from "../api/wishlist";

export default function ProductList(props) {
  const dispatch = useDispatch();
  const wishlist = useSelector(state=>state.wishlist.items) || [];
  const token = localStorage.getItem("accessToken");

  const handleWishlist = async (productId) => {
    const exists = wishlist.includes(productId);
    try {
      if (token) {
        if (exists) {
          await removeFromWishlist(productId);
        } else {
          await addToWishlist(productId);
        }
      }

      dispatch(toggleWishlist(productId)); // after success
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='product-list'>
      { 
        props.products.map((product) => (
          <div className='product-dtl-box' key={`prod-box-${product._id}`}>
            <div className='wishlist' onClick={()=>handleWishlist(product._id)}>
              <FontAwesomeIcon 
                icon={faHeart} 
                style={{fontSize:"1.5rem", color: wishlist.includes(product._id) ? "red" : "black"}}
              />
            </div>
            <div className='product-img'>
              <img src={product.images?.[0]} alt="img"/>
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
