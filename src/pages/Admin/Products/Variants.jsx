import React, {useEffect, useState} from 'react'
import CheckboxGroup from '../../../components/Admin/form/fields/CheckboxGroup'; 
import CommonStyles from "../../../css/Admin/Common.module.css";
import DTStyles from "../../../css/Admin/DataTable.module.css";


export default function Variants({ formData, setFormData, selectedColors, setColors, clearError }) {
  const variantAttributes = formData.attributes.filter(a => a.isVariant);
  const tableHeading = [...(variantAttributes.map(a=>a.name) || []),"MRP", "Price", "Discount", "Stock", "Action"]
  const measurementAttribute = variantAttributes.find(a => a.isUsedForMeasurement);
  const specificationAttributes = formData.attributes.filter(a => !a.isUsedForMeasurement && !a.isVariant);

  const [selectedVariants, setSelectedVariants] = useState({});
  
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

  const generateVariants = () => {

    const values = Object.values(selectedVariants);

    if (!values.length) return;

    let combinations = [[]];

    values.forEach(attributeValues => {

        const newCombinations = [];

        combinations.forEach(existing => {

            attributeValues.forEach(value => {

                newCombinations.push([
                    ...existing,
                    value
                ]);

            });

        });

        combinations = newCombinations;
    });

    const variants = combinations.map(combination => {

        const attributes = {};

        Object.keys(selectedVariants).forEach((name, index) => {
            attributes[name] = combination[index];
        });

        return {
            attributes,
            sku: "",
            mrp: "",
            price: "",
            discount: "",
            stock: ""
        };
    });

    setFormData(prev => ({
        ...prev,
        variants
    }));
};


return (
    <> 
      { 
        formData.categoryId ? 
        <>
          <div className='variant_attributes'>
            {/* Other Attributes */}
            {variantAttributes.map(attr => {
               const selectedValues = formData.variantSelections?.[attr._id] || [];
               return (
                <>
                <div className='variant_heading'>{attr.name}</div>
                <CheckboxGroup
                  // listStyle="grid"
                  field={{
                      label: "",
                      valueField: "value",
                      labelField: "label"
                  }}
                  options={attr.values.map(v => ({
                      value: v,
                      label: v
                  }))}
                  value={selectedVariants[attr.name] || []}
                  onChange={(updatedValues, value, checked) => {

                      setSelectedVariants(prev => ({
                          ...prev,
                          [attr.name]: updatedValues
                      }));

                      if (attr.name.toLowerCase() === "color") {
                          handleColorSelection(value, checked);
                      }
                  }}
                  clearError={clearError}
                />
                </>
               );
            })}

          </div>
          <button
            type="button"
            onClick={generateVariants}
          >
              Generate Variants
          </button>
          <div className={DTStyles.tableContainer}>
            <div className={CommonStyles.formGroup}>
              <table className={DTStyles.tableWrapper}>
                  <thead>
                  <tr>
                      { tableHeading.map((th)=> <th> {th} </th>) }
                  </tr>
                  </thead>
                  <tbody>
                    {
                      formData.variants.map((variant, index) => (
                        <tr key={index}>
                        {Object.values(variant.attributes || {}).map((value, i) => (
                            <td key={i}>
                                {value}
                            </td>
                        ))}

                        {/* Price, Discount, Stock, Action */}
                        {
                          // formData.variants[index]?.sku ? 
                          // <td>
                          //   <input
                          //   placeholder='00.00'
                          //   className={CommonStyles.formControl}
                          //   type="text"
                          //   value={formData.variants[index]?.sku || ""}
                          //   onChange={(e) => updateVariant(index, "price", e.target.value)}
                          //   />
                          // </td> : ""
                        }
                        
                        <td>
                            <input
                            placeholder='00.00'
                            className={CommonStyles.formControl}
                            type="text"
                            value={formData.variants[index]?.mrp || ""}
                            onChange={(e) => updateVariant(index, "mrp", e.target.value)}
                            />
                        </td>
                        
                        <td>
                            <input
                            placeholder='00.00'
                            className={CommonStyles.formControl}
                            type="text"
                            value={formData.variants[index]?.price || ""}
                            onChange={(e) => updateVariant(index, "price", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                            className={CommonStyles.formControl}
                            type="text"
                            value={formData.variants[index]?.discount || ""}
                            onChange={(e) => updateVariant(index, "discount", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                            className={CommonStyles.formControl}
                            type="text"
                            value={formData.variants[index]?.stock || ""}
                            onChange={(e) => updateVariant(index, "stock", e.target.value)}
                            />
                        </td>
                        <td>
                            <button type="button" onClick={() => removeVariant(index)}>❌</button>
                        </td>
                        </tr>
                    ))
                  }
                  </tbody>
              </table>
            </div> 
          </div>

          <div className={CommonStyles.formGroup}>
            <label className={CommonStyles.formLabel}>
              <h3>Specifications</h3>
            </label> 
            <CheckboxGroup
              listStyle="grid"
              field={{
                  name: "attributeIds",
                  collection: "attributes",
                  valueField: "_id",
                  labelField: "name"
              }}
              value={formData.specifications || []}
              onChange={handleSpecifications}
              clearError={clearError}
            />
          </div> 

        </> : "" 
      } 
    </>
)
}