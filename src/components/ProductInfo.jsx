import { useState } from "react";
import AddToCart from "./AddToCart";
import LayoutCss from "../css/newLayoutCopy.module.css";

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
    <div className={LayoutCss.productInfoWrapper}>
      <div className={LayoutCss.productInfoDetail}>
        <div className={LayoutCss.brand}>
          {product?.[0]?.brandSlug?.toUpperCase()}
        </div>

        <div className={LayoutCss.title}>{product?.[0]?.name}</div>

        <div className={LayoutCss.price}>₹{product?.[0]?.minPrice}</div>

        <div className={LayoutCss.mrpDiscount}>
          <span>MRP ₹{product?.[0]?.minPrice}</span>
          <span> ({product?.[0]?.minPriceDiscount}% OFF)</span>
        </div>

        <div className={LayoutCss.colorsGroup}>
          <div className={LayoutCss.colorsBox}>
            { Object.entries(colorImages).map(([color, images]) => {
            const cleanColor = color.replace(/"/g, "");

            const colorObj = colorsData.find(
              c => c.color.toLowerCase() === cleanColor.toLowerCase()
            );

            return (
              <div key={color}>
                <div
                  className={`${LayoutCss.colorCircle} ${selectedColor === cleanColor ? "active" : ""}`}
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
        <div className={LayoutCss.pdBtnGroup}>
          <AddToCart 
            product={product} 
            color={selectedColor}
          />
          
          <div className={`${LayoutCss.wishlistBtn} ${LayoutCss.dtlBtn}`}>
            <button>
            SAVE TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}