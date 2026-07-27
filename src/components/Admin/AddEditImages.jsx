import React, { useState } from "react";

export default function AddEditImages({
  selectedColors,
  formData,
  setFormData,
  colorsData1
}) {
    console.log("Inside add Edit images");
  const [activeColor, setActiveColor] = useState(null);

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
    
    <div className="column2">
      <h3>Add Images by Color</h3>
    {console.log(colorsData1)}
      {colorsData1.map((color) => {
        const colorData = formData?.colorImages?.find(c => c.color === color);

        const isOpen = activeColor === color;

        return (
          <div key={color} className="accordion-item">

            <div
              className="accordion-header"
              onClick={() => toggleAccordion(color)}
            >
              <span>{color}</span>
              <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="accordion-body">
                
                  <>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        handleImageChange(
                          color,
                          e.target.files
                        );
                      }}
                    />

                    <div className="image-list">
                      {colorData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="image-item"
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
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}