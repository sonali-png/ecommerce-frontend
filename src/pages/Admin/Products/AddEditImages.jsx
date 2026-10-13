import React, { useState } from "react";
import CommonStyles from "../../../css/Admin/Common.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AddEditImages({
  selectedColors,
  formData,
  setFormData,
  errors
}) {
  const [activeColor, setActiveColor] = useState(null);

  const toggleAccordion = (color) => {
    setActiveColor((prev) =>
      prev === color ? null : color
    );
  };

  const handleImageChange = (color, files) => {
    const fileArray = Array.from(files || []);

    console.log("Selected color:", color);
    console.log("Selected files:", fileArray);

    if (!fileArray.length) return;

    setFormData((prev) => ({
      ...prev,

      colorImages: (prev.colorImages || []).map((item) =>
        item.color === color
          ? {
              ...item,
              images: [
                ...(item.images || []),

                ...fileArray.map((file) => ({
                  file: file,
                  isPrimary: false
                }))
              ]
            }
          : item
      )
    }));
  };

  const removeImage = (color, index) => {
    setFormData((prev) => ({
      ...prev,

      colorImages: (prev.colorImages || []).map((item) =>
        item.color === color
          ? {
              ...item,
              images: (item.images || []).filter(
                (_, i) => i !== index
              )
            }
          : item
      )
    }));
  };

  const setPrimaryImage = (color, index) => {
    setFormData((prev) => ({
      ...prev,

      colorImages: (prev.colorImages || []).map((item) =>
        item.color === color
          ? {
              ...item,

              images: (item.images || []).map((img, i) => ({
                ...img,
                isPrimary: i === index
              }))
            }
          : item
      )
    }));
  };

  return (
    <>
    {console.log(" formData?.colorImages ",  formData?.colorImages)}
      <div className={CommonStyles.formGroup}>
        <label className={CommonStyles.formLabel}>
          Add or Edit images
        </label>

        <h6>Note: Click on image to make primary</h6>
      </div>

      {selectedColors.map((color) => {
        const colorData =
          formData?.colorImages?.find(
            (c) => c.color === color
          );

        const images = colorData?.images || [];

        const isOpen = activeColor === color;

        return (
          <div
            key={color}
            className={CommonStyles.formGroup}
          >
            <div className={CommonStyles.accordionItem}>

              <div
                className={CommonStyles.accordionHeader}
                onClick={() => toggleAccordion(color)}
              >
                <span>{color}</span>
                <span>{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className={CommonStyles.accordionBody}>

                  <input
                    className={CommonStyles.formControl}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(
                        color,
                        e.target.files
                      );

                      // Allows selecting the same file again
                      e.target.value = "";
                    }}
                  />
                  
                  {/* Error for this color */}
                  {errors?.colorImages?.[color] && (
                    <div className={CommonStyles.error}>
                      * {errors.colorImages[color]}
                    </div>
                  )}
                  
                  <div className={CommonStyles.imageList}>
                    {images.map((img, idx) => {

                      let imageSrc = "";

                      if (img.url) {
                        // Existing uploaded image
                        imageSrc = img.url;
                      } else if (img.file instanceof File) {
                        // Newly selected image
                        imageSrc = URL.createObjectURL(img.file);
                      }

                      // console.log("img ", img)

                      return (
                        <div
                          key={`${color}-${idx}`}
                          className={CommonStyles.imageItem}
                        >

                          {imageSrc && (
                            <img
                              src={imageSrc}
                              alt=""
                              width="100"
                            />
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              removeImage(color, idx)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              style={{
                                fontSize: "0.5rem",
                                verticalAlign: "0.875em"
                              }}
                            />
                          </button>
                              {/* {console.log("Is primary ", img?.isPrimary)} */}
                          <label>
                            <input
                              type="radio"
                              name={`primaryImage-${color}`}
                              checked={
                                img?.isPrimary === true
                              }
                              onChange={() =>
                                setPrimaryImage(
                                  color,
                                  idx
                                )
                              }
                            />

                            Primary
                          </label>

                        </div>
                      );
                    })}

                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </>
  );
}