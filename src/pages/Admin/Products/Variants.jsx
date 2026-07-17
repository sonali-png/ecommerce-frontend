import React, {useEffect, useState} from 'react'

export default function Variants({ formData, setFormData, selectedColors, setColors }) {
    const variantAttributes = formData.attributes.filter(a => a.isVariant);
    const tableHeading = [...(variantAttributes.map(a=>a.name) || []),"Price", "Discount", "Stock", "Action"]

    const measurementAttribute = variantAttributes.find(a => a.isUsedForMeasurement);

    const otherVariantAttributes = formData.attributes.filter(a => !a.isUsedForMeasurement && a.isVariant);

    const specificationAttributes = formData.attributes.filter(a => !a.isUsedForMeasurement && !a.isVariant);
    // ✅ Remove variant
    const removeVariant = (index) => {
        const updated = formData.variants.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, variants: updated }));
    };
    const updateVariant = (index, field, value) => {
      console.log(`Checked`);
        const updatedVariants = [...formData.variants];

        updatedVariants[index] = {
            ...updatedVariants[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            variants: updatedVariants
        }));
    };

    const handleColorSelection = (color, checked) => {
      if (checked) {
        setColors(prev => [...new Set([...prev, color])]);

        setFormData(prev => {
          const exists = prev.colorImages.some(
            c => c.color === color
          );

          if (exists) return prev;

          return {
            ...prev,
            colorImages: [
              ...prev.colorImages,
              {
                color,
                images: []
              }
            ]
          };
        });
      } else {
        setColors(prev => prev.filter(c => c !== color));
      }
    };

    const handleSpecifications = (attributeId) => {
      setFormData(prev => {
        const exists = prev.specifications.includes(attributeId);
        return {
          ...prev,
          specifications: exists
            ? prev.specifications.filter(id => id !== attributeId)
            : [...prev.specifications, attributeId]
        };
      });
    };


    return (
    <> 
        { 
            formData.categoryId && 
            <> 
                <table>
                    <thead>
                    <tr>
                        { tableHeading.map((th)=> <td> {th} </td>) }
                    </tr>
                    </thead>
                    <tbody>
                        {formData.attributes.map((variant, index) => (
                          
                            <tr key={index}>
                            {/* Measurement attribute */}
                            <td>{measurementAttribute.values[index]}</td>

                            {/* Other Attributes - each in its own <td> */}
                            {otherVariantAttributes.map(attr => (
                                <td key={attr._id}>
                                  <div className="flex-checkboxes">
                                    {
                                    attr.values.map(value => (
                                      <div key={value}>
                                        <label>{value}</label>
                                        <input
                                          type="checkbox"
                                          checked={ formData.variants[index]?.[attr.name]?.includes(value)}
                                          onChange={(e) => {
                                            const currentValues = formData.variants[index]?.[attr.name] || [];
                                            let updatedValues;
                                            if (e.target.checked) {
                                                updatedValues = [...currentValues, value];
                                            } else {
                                                updatedValues = currentValues.filter(v => v !== value);
                                            }
                                            updateVariant(index, attr.name, updatedValues);
                                            
                                            if (attr.name.toLowerCase() === 'color') {
                                              handleColorSelection(value, e.target.checked);
                                            }
                                            
                                          }}
                                          value={value.toLowerCase()}
                                        />
                                      </div>  
                                    ))}
                                  </div>
                                </td>
                            ))}

                            {/* Price, Discount, Stock, Action */}
                            <td>
                                <input
                                type="text"
                                value={formData.variants[index]?.price || ""}
                                onChange={(e) => updateVariant(index, "price", e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                type="text"
                                value={formData.variants[index]?.discount || ""}
                                onChange={(e) => updateVariant(index, "discount", e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                type="text"
                                value={formData.variants[index]?.stock || ""}
                                onChange={(e) => updateVariant(index, "stock", e.target.value)}
                                />
                            </td>
                            <td>
                                <button type="button" onClick={() => removeVariant(index)}>❌</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>

            </table>
            <h2>Add specifications</h2>
            <div className="input-box">
                    <div className="attribute-list">
                        {specificationAttributes.map(attr => (
                            <label
                                key={attr._id}
                                className="checkbox-item"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData?.specifications && formData?.specifications.find(item => item === attr._id)}
                                    onChange={() =>
                                        handleSpecifications(attr._id)
                                    }
                                />
                                <span>{attr.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </>
        }
    </>
  )
}
