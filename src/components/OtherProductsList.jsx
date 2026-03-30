import { useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {removeFromWishlist} from "../api/wishlist";


export default function OtherProductsList(props) {
    const dispatch = useDispatch();

    const removeProduct = async (productId) => {
    try {
        await removeFromWishlist(productId);
        dispatch(toggleWishlist(productId));
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
};

    return (
    <div className="bgf-other-product-wrapper">
        <div className='bgf-other-title'>
            <span>{props.pageHeading}</span>
        </div>
        <div className="product-list-other">
            {
                props.products.map((product) => (
                <div className='product-detail' key={product._id}>
                    <div className='product-image'>
                        <img src={product.images?.[0]} alt="image" />
                    </div>
                    <div className='product-text-detail'>
                        <span>{product.name}</span>
                        <h4>{product.price}</h4>
                    </div>
                    <div className='remove-item'>
                        <FontAwesomeIcon icon={faTrash} onClick={()=>removeProduct(product._id)}/> </div>
                </div>
                ))
            }   
        </div>
    </div>
  )
}
