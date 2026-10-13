import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { addToGuestCart, addToUserCartServer } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function AddToCart({
  productId,
  color,
  selectedVariants,
  sku
}) {
  const dispatch = useDispatch();
  const user = useAuth();
  const isLoggedIn = !user;
  const userId = user?._id;
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log(`cartItems for ${selectedVariants} : `, selectedVariants);
  

  const isProductInCart = cartItems.some((item) => item.productId === productId && item.color === color);
  
  const handleAddToCart = () => {
    if (!color) {
      alert("Please select a color");
      return;
    }
    const item = {
      productId: productId,
      color,
      quantity: 1,
      selectedVariants,
      sku
    };
    console.log("Add to cart item : ", item)

    if (isLoggedIn) {
      dispatch(addToUserCartServer({ userId, item }));
    } else {
      dispatch(addToGuestCart(item));
    }
  };

  if (isProductInCart) {
    return (
      <div className="cart-btn dtl-btn">
        <button 
          className="go-to-cart" 
          onClick={() => navigate("/cart")}
        >
          GO TO CART
        </button>
      </div>
    );
  }
  return (
    <div className="cart-btn dtl-btn">
      <button
        className="add-to-cart"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>
    </div>
);
}