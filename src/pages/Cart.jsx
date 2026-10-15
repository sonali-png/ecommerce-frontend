import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { removeFromGuestCart, removeFromUserCartServer, updateGuestQuantity, updateCartQuantityServer } from "../redux/cartSlice";
import CartStyle from "../css/cart.module.css";
import LayoutCss from "../css/newLayoutCopy.module.css";
import useCommonList from "../hooks/useCommonList";
import { createAttributeMap } from "../utils/attriuteHelper";
import Error from "../components/Error";

export default function Cart() {
  
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  
  // Get items from Redux Store
  const cartItems = useSelector((state) => state.cart.items);

  const {
    records: products = [],
    loading: productsLoading,
    error: productsError,
  } = useCommonList("products");

  const getProduct = (item) => {
    return products.find((product) =>String(product._id) === String(item.productId));
  };

  // Fetch attribute names from the Attributes collection
  const {
    records: attributesByCategory = []
  } = useCommonList("attributes", {
    select: {
      name: 1
    }
  });

  // Create a map: attributeId -> attribute name
  const attributeNameMap = useMemo( () => createAttributeMap(attributesByCategory),[attributesByCategory]);

  // Match the exact selected variant
  const getVariant = (item, product) => {
    if (!product) return null;

    const selectedAttributes = item.selectedVariants;
    if (!selectedAttributes?.length) {
      return null;
    }
    
    return product.variants?.find((variant) => {
      const variantAttributes = variant.attributes ?? [];
      return (
        variantAttributes.length === selectedAttributes.length 
        && selectedAttributes.every((selected) =>
          variantAttributes.some((attribute) => {
            const variantAttributeId =  attribute.attributeId?._id ?? attribute.attributeId;
            const selectedAttributeId = selected.attributeId?._id ?? selected.attributeId;
            return (
              String(variantAttributeId) ===  String(selectedAttributeId) &&  attribute.value === selected.value
            );
          })
        )
      );
    });
  };

  const getCartImage = (item, product) => {
    if (!product) return "";
    const selectedColor = item.color;
    const colorGroup = product.colorImages?.find((group) =>
      group.color?.toLowerCase() === selectedColor?.toLowerCase()
    );

    const images = colorGroup?.images ?? [];

    return (
      images.find((image) => image.isPrimary)?.url || 
      images[0]?.url ||  
      product.images?.find((image) => image.isPrimary)?.url || 
      product.images?.[0]?.url ||
      ""
    );
  };

  const cartDisplayItems = cartItems.map((item) => {
    const product = getProduct(item);
    const variant = getVariant(item, product);

    return {
      ...item,
      product,
      variant,
      image: getCartImage(item, product),
      price: variant?.price ?? item.price ?? 0,
      mrp: variant?.mrp ?? item.mrp ?? 0,
      discount: variant?.discount ?? item.discount ?? 0,
      stock: variant?.stock ?? 0
    };
  });

  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotalPrice = cartDisplayItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (
    productId,
    currentQty,
    color,
    adjustment,
    stock
  ) => {
    const newQuantity = currentQty + adjustment;

    if (newQuantity < 1 || newQuantity > stock) {
      return;
    }

    if (user) {
      dispatch(
        updateCartQuantityServer({
          userId: user._id,
          productId,
          quantity: newQuantity,
          color,
        })
      );
    } else {
      dispatch(
        updateGuestQuantity({
          productId,
          quantity: newQuantity,
          color,
        })
      );
    }
  };

  const handleRemoveItem = (productId, sku) => {
    if (user) {
      dispatch(removeFromUserCartServer({ userId: user._id, productId, sku }));
    } else {
      dispatch(removeFromGuestCart({productId, sku}));
    }
  };

  const handleLogin = () => {
    if(user == null) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }
  if (productsLoading) {
    return <p>Loading cart products...</p>;
  }

  if (productsError) {
    return <p>Unable to load product details.</p>;
  }
  if (cartItems.length === 0) {
    return (
      <Error 
        heading="Your Cart is Empty"
        info="Looks like you haven't added anything to your cart yet."
      />
    );
  }
  

  return (
    <div className={LayoutCss.bgfWrapper}>
      <div className={LayoutCss.container}>
        <div className={CartStyle.cartContentLayout}>
            <div className={CartStyle.cartContentWrapper}>
            {/* Left side: cart items */}
            <div className={CartStyle.cartItemsList}>
              <div className={CartStyle.heading}>Product Details</div>
              {cartDisplayItems.map((item, index) => {
                const {
                  product,
                  variant,
                  image,
                  price,
                  mrp,
                  stock,
                  discount,
                  sku
                } = item;

                console.log("SKU AT 183 ", sku);
                const hasselectedVariants = Boolean(variant);

                return (
                  <div
                    key={`${item.productId}-${item.color ?? ""}-${index}`}
                    className={CartStyle.cartItemCard}
                  >
                    {!product ? (
                      <div className={CartStyle.itemDetails}>
                        <p>Product details could not be loaded.</p>
                      </div>
                    ) : (
                      <>
                        {/* Product image */}
                        <div className="item-image">
                          {image && (
                            <img
                              src={image}
                              alt={product.name}
                              width="60"
                              height="70"
                            />
                          )}
                        </div>

                        {/* Product information */}
                        <div className={CartStyle.itemDetails}>
                          <div className={CartStyle.productTitle}>{product.name}</div>
                          {hasselectedVariants ? (
                            <>
                              <p className="itemPrice"> 
                                <span className={CartStyle.price}>₹{price} </span>
                                <span className={`${LayoutCss.strikethrough} ${CartStyle.mrp}`}>₹{mrp} </span>
                                <span className={LayoutCss.mr5px}></span>
                                <span className={CartStyle.discount}>{discount} % Off</span>
                              </p>
                              {stock === 0 && ( <p>Out of stock</p>)}
                            </>
                          ) : (
                            <p> Please select a valid product variant.</p>
                          )}


                          {/* Selected variant attributes */}
                          {
                            item.selectedVariants?.map((attribute, attributeIndex) => {
                              const attributeId = attribute.attributeId?._id ?? attribute.attributeId;
                              const attributeName = attribute.attributeId?.name ?? attributeNameMap[String(attributeId)] ?? "Attribute";

                              return (
                                <p
                                  key={`${attributeId}-${attributeIndex}`}
                                >
                                  {attributeName}: {attribute.value}
                                </p>
                              );
                            })
                          }
                          
                          {/* Quantity controls */}
                          <div className={CartStyle.itemQuantityControls}>
                            <button
                              disabled={!variant || item.quantity <= 1}
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity,
                                  item.color,
                                  -1,
                                  stock
                                )
                              }
                            >
                              -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              disabled={
                                !variant ||
                                stock <= 0 ||
                                item.quantity >= stock
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity,
                                  item.color,
                                  1,
                                  stock
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          {/* Subtotal and remove */}
                          <div className={CartStyle.itemActions}>
                            <button
                              className={`${CartStyle.btnRemove} ${LayoutCss.btnTransperant} ${LayoutCss.withNoBorder}`}
                              onClick={() =>
                                handleRemoveItem(item.productId, sku)
                              }
                            >
                              X REMOVE
                            </button>
                          </div>
                        </div>

                        
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={CartStyle.divider}></div>
            {/* Right side: order summary */}
            <div className={CartStyle.cartSummaryCard}>
              <div className={CartStyle.heading}>Order Summary</div>

              <div className="summary-row">
                <span>Total Items : </span>
                <span>{totalItemsCount}</span>
              </div>

              <div className="summary-row">
                <span>Total Price : </span>
                <span>{totalItemsCount}</span>
              </div>

              <div className="summary-row total-row">
                <span>Order Total : </span>
                <span>
                  ₹{subtotalPrice.toFixed(2)}
                </span>
              </div>

              <button
                className={CartStyle.btnCheckout}
                disabled={cartDisplayItems.some(
                  (item) =>
                    !item.product ||
                    !item.variant ||
                    item.stock < item.quantity
                )}
                // Navigate to signup if user not logged in else to checkout
                onClick={handleLogin}                
              >
                Proceed to Pay
              </button>

              <Link
                to="/"
                className="continue-shopping-link"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
