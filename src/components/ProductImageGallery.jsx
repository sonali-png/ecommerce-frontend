import { useState, useEffect } from "react";
import pdGalleryCss from "../css/pdGallery.module.css";

export default function ProductImageGallery({
  productImages = [],
  selectedColor = ""
}) {
  console.log("selectedColor ", selectedColor)
  const [activeImage, setActiveImage] = useState("");
  const currentColorData =
    productImages.find(item => item.color === selectedColor) ||
    productImages[0];

  const colorImages = currentColorData?.images || [];

  useEffect(() => {
    const primaryImage = colorImages.find(
      img => img.isPrimary === true
    );

    if (primaryImage) {
      setActiveImage(primaryImage.url);
    } else if (colorImages.length > 0) {
      setActiveImage(colorImages[0].url);
    } else {
      setActiveImage("");
    }
  }, [selectedColor, productImages]);

  return (
    <div className={pdGalleryCss.productGallery}>

      {/* Thumbnails */}
      <div className={pdGalleryCss.thumbnailContainer}>
        {colorImages.map((img, index) => (
          <div
            className={pdGalleryCss.thumbnails}
            key={img.public_id || index}
          >
            <img
              src={img.url}
              alt=""
              className={`${pdGalleryCss.thumbnail} ${
                activeImage === img.url
                  ? pdGalleryCss.active
                  : ""
              }`}
              onClick={() => setActiveImage(img.url)}
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className={pdGalleryCss.mainImageContainer}>
        {activeImage && (
          <img
            src={activeImage}
            alt="Product"
            className={pdGalleryCss.mainImage}
          />
        )}
      </div>

    </div>
  );
}