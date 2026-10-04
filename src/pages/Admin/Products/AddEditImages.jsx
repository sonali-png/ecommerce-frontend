import React, { useState } from "react";
import CommonStyles from "../../../css/Admin/Common.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function AddEditImages({
  selectedColors,
  formData,
  setFormData
}) {
  const [activeColor, setActiveColor] = useState(null);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  console.log(`Is primary imahe `, primaryImageIndex);

  const toggleAccordion = (color) => {
    setActiveColor(prev =>
      prev === color ? null : color
    );
  };

  const handleImageChange = (color, files) => {
  const fileArray = Array.from(files);

  setFormData(prev => ({
    ...prev,
    colorImages: (prev.colorImages || []).map(item =>
      item.color === color
        ? {
            ...item,
            images: [...(item.images || []), ...fileArray]
          }
        : item
    )
  }));
};

  const removeImage = (color, index) => {
    setFormData(prev => ({
      ...prev,
      colorImages: (prev.colorImages || []).map(item =>
        item.color === color
          ? {
              ...item,
              images: item.images.filter((_, i) => i !== index)
            }
          : item
      )
    }));
  };

  return (
    <>
      <div className={CommonStyles.formGroup}>
          <label className={CommonStyles.formLabel}>Add or Edit images</label>
      </div>
      {selectedColors.map((color) => {
        const colorData = formData?.colorImages?.find(c => c.color === color);

        const isOpen = activeColor === color;
        

        return (
        <div className={CommonStyles.formGroup}>
          <div key={color} className={CommonStyles.accordionItem}>
            <div
              className={CommonStyles.accordionHeader}
              onClick={() => toggleAccordion(color)}
            >
              <span>{color}</span>
              <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className={CommonStyles.accordionBody}>
                
                  <>
                    
                    <input
                      className={CommonStyles.formControl}
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleImageChange(
                          color,
                          e.target.files
                        );
                      }}
                    />

                    <div className={CommonStyles.imageList}>
                      {colorData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={CommonStyles.imageItem}
                        >
                          <img
                            src={
                              img.url
                                ? img.url
                                : URL.createObjectURL(img)
                            }
                            alt=""
                            width="100"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeImage(color, idx)
                            }
                          >
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{fontSize:"1rem"}}                            
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
              </div>
            )}
          </div>
        </div>
        );
      })}
    </>
  );
}