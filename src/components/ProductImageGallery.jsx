import { useState, useEffect } from "react";
import "../css/pdGallery.css"
export default function ProductImageGallery({ colorImages=[], selectedColor="" }) {
  const images = colorImages[selectedColor] || [
    "https://assets-jiocdn.ajio.com/medias/sys_master/root1/20260311/PXxk/69b14d554970ce6a6e3a1e3e/-473Wx593H-703144763-orange-MODEL.jpg",
    "https://assets-jiocdn.ajio.com/medias/sys_master/root1/20260311/ZZu0/69b14d554970ce6a6e3a1db2/-78Wx98H-703144763-orange-MODEL2.jpg",
    "https://assets-jiocdn.ajio.com/medias/sys_master/root1/20260311/5bgr/69b14d554970ce6a6e3a1db1/-78Wx98H-703144763-orange-MODEL3.jpg"
  ];

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (images.length) {
      setActiveImage(images[0]);
    }
  }, [selectedColor]);

  return (
    <div className="product-gallery">
      {/* Thumbnails */}
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`thumbnail ${
              activeImage === img ? "active" : ""
            }`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={activeImage}
          alt="Product"
          className="main-image"
        />
      </div>
    </div>
  );
}