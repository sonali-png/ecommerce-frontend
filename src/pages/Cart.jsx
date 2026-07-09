import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { removeFromGuestCart, removeFromUserCartServer, updateGuestQuantity, updateCartQuantityServer } from "../redux/cartSlice";
// import "../css/cart.css"; // Optional styling sheet placeholder

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Grab items from Redux Store
  const cartItems = useSelector((state) => state.cart.items);

  // Structural subtotal metrics
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Quantity step handler (+1 / -1)
  const handleQuantityChange = (productId, currentQty, adjustment) => {
    const newQuantity = currentQty + adjustment;
    if (newQuantity < 1) return; // Prevent reducing past 1 (use remove button instead)

    if (user) {
      dispatch(updateCartQuantityServer({ userId: user._id, productId, quantity: newQuantity }));
    } else {
      dispatch(updateGuestQuantity({ productId, quantity: newQuantity }));
    }
  };

  // Item deletion handler
  const handleRemoveItem = (productId) => {
    if (user) {
      dispatch(removeFromUserCartServer({ userId: user._id, productId }));
    } else {
      dispatch(removeFromGuestCart(productId));
    }
  };

  // Fallback empty view markup
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-shop-now">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <h1>Shopping Cart ({totalItemsCount} items)</h1>
      
      <div className="cart-content-layout">
        {/* Left Side: Cart Items List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item-card">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>

              {/* Quantity Adjusters */}
              <div className="item-quantity-controls">
                <button onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}>+</button>
              </div>

              {/* Individual Item Subtotal & Action */}
              <div className="item-actions">
                <p className="item-total">Total: ₹{item.price * item.quantity}</p>
                <button className="btn-remove" onClick={() => handleRemoveItem(item.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Checkout Pricing Card */}
        <div className="cart-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{totalItemsCount}</span>
          </div>
          <div className="summary-row total-row">
            <span>Subtotal:</span>
            <span>₹{subtotalPrice}</span>
          </div>
          <button className="btn-checkout" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
          <Link to="/" className="continue-shopping-link">or Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
