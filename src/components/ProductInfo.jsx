import { useState } from "react";
import AddToCart from "./AddToCart";

export default function ProductInfo({ product, colorsData }) {
  console.log(product);
  const colorImages = product?.[0]?.colorImages || [];
  const [selectedColor, setColor] = useState("");
  const [measurementType, setType] = useState("");
  const [measurementValue, setValue] = useState("");
  const handleColor = async(color)=> {
    setColor(color);
  };
  return (
    <div className="product-info-wrapper">
      <div className="product-info-detail">
        <div className="brand">
          {product?.[0]?.brandSlug?.toUpperCase()}
        </div>

        <div className="title">{product?.[0]?.name}</div>

        <div className="price">₹{product?.[0]?.minPrice}</div>

        <div className="mrp-discount">
          <span>MRP ₹{product?.[0]?.minPrice}</span>
          <span> ({product?.[0]?.minPriceDiscount}% OFF)</span>
        </div>

        <div className="colors-group">
          <div className="colors-box">
            { Object.entries(colorImages).map(([color, images]) => {
            const cleanColor = color.replace(/"/g, "");

            const colorObj = colorsData.find(
              c => c.color.toLowerCase() === cleanColor.toLowerCase()
            );

            return (
              <div key={color}>
                <div
                    className={`color-circle ${
                      selectedColor === cleanColor ? "active" : ""
                    }`}
                  style={{
                    backgroundColor: colorObj?.hex
                  }}
                  onClick={()=>handleColor(cleanColor)}
                />
                <h4>{cleanColor}</h4>
              </div>
            );
          })}
          </div>
        </div>
        <div className="pd-btn-group">
          <AddToCart 
            product={product} 
            color={selectedColor}
          />
          
          <div className="wishlist-btn dtl-btn">
            <button>
            SAVE TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}