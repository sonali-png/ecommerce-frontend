import { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";
import useCommonList from "../../../hooks/useCommonList";
import { useNavigate, useParams } from "react-router-dom";
import Variants from "./Variants";
import AddEditImages from "./AddEditImages";
import { productConfig } from "../../../config/productConfig";
import { countryConfig } from "../../../config/countryConfig";
import Popup from "../../../components/Admin/Popup";
import CommonStyles from "../../../css/Admin/Common.module.css";

export default function AddEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {records:categories } = useCommonList("categories");
  const {records:brands } = useCommonList("brands");
  const {records:colors } = useCommonList("colors");
  const {records:product  } = useCommonList("products", {"id" : id});
  const { addRecord, updateRecord } = useCrud();
  const [selectedColors, setColors] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [errors, setErrors] = useState("");
  const [variantResetKey, setVariantResetKey] = useState(0);
  
  const clearError = (fieldName) => {
    setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
    });
  };
  const validateField = (fieldName, value) => {
    const error = productConfig.validateField(fieldName, value);
    setErrors(prev => {
      const newErrors = { ...prev };

      if (error) {
        newErrors[fieldName] = error;
      } else {
        delete newErrors[fieldName];
      }

      return newErrors;
    });
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
    variants: [],
    specifications: [],
    colorImages: [],
    attributes: [],
    details: {
      productCode:"",
      genericName: "",
      countryOfOrigin: "",
      manufacturedBy: "",
      manufacturerAddress: "",
      packedBy:"",
      packerAddress:""
    }
  });

  useEffect(() => {
    
    if (id && product) {
      console.log("Product data");
       console.log(product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        categoryId: product.categoryId || "", // safe access
        brandId: product.brandId || "",
        variants: product.variants || [],
        colorImages: product?.colorImages || [],
        specifications: product?.specifications || [],
        attributes: categories.find(c => c._id === product.categoryId)?.attributeIds || [],
        details: product?.details || {
          genericName: "",
          countryOfOrigin: "",
          manufacturedBy: "",
          manufacturerAddress: "",
          packedBy: "",
          packerAddress: ""
        },
      });
      if(product?.colorImages?.length > 0) {
        setColors((product?.colorImages || []).map(c => c?.color));
      }
    }
  }, [id, product]);

  const saveProduct = async (payload) => {
      let response;
        try {
            if (id) {
                payload.append("id", id);
                response = await updateRecord(payload);
            } else {
                response = await addRecord(payload);
            }
            setShowPopup(true);
            setPopupMessage((response.message));
            setPopupType("success");
        } catch (error) {
            console.log(error);
            setPopupType("error");
            setPopupMessage(
                error?.response?.message || 
                "Something went wrong"
            )
            setShowPopup(true);
        }
  };
  const handleCategoryAttributes = (e) => {
    const categoryId = e.target.value;
    const catAttributeData = categories.find(c => c._id === categoryId)?.attributeIds || [];
    setFormData(prev => ({
      ...prev,
      categoryId: categoryId,
      attributes: catAttributeData,
      variants: [],
      colorImages: []
    }));
    setColors([]);
    clearError("categoryId");
     setVariantResetKey(prev => prev + 1);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM DATA BEFORE SUBMIT:", formData);

    /* check images errors */
    const imageErrors = {};

    selectedColors.forEach((color) => {
      const colorData = formData.colorImages?.find(
        (item) => item.color === color
      );

      if (!colorData || !colorData.images || colorData.images.length === 0) {
        imageErrors[color] = `Please upload at least one image for ${color}`;
      }
    });

    if (Object.keys(imageErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        colorImages: imageErrors
      }));

      return false;
    }
    /* images validation error ends */
    if (productConfig.validate) {
      const validationErrors = productConfig.validate(formData);

      console.log("Validation errors:", validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
    }

    const payload = new FormData();
    const structuredData = {
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      categoryId: formData.categoryId,
      brandId: formData.brandId,
      variants: formData.variants,
      specifications: formData.specifications,
      details: formData.details,

      colorImages: (formData.colorImages || []).map((colorData) => ({
        color: colorData.color,

        images: (colorData.images || [])
          .filter((img) => img.url)
          .map((img) => ({
            url: img.url,
            public_id: img.public_id,
            alt: img.alt || "",
            isPrimary: img.isPrimary || false
          }))
      }))
    };

    console.log("STRUCTURED DATA:", structuredData);

    payload.append(
      "collectionName",
      "products"
    );

    payload.append(
      "data",
      JSON.stringify(structuredData)
    );
    (formData.colorImages || []).forEach((colorData, colorIndex) => {

      (colorData.images || []).forEach((img) => {

        if (img.file instanceof File) {

          console.log(
            "Uploading:",
            colorData.color,
            img.file.name,
            img.isPrimary
          );

          payload.append(
            `images_${colorIndex}`,
            img.file
          );
        }

      });

    });

    try {
      await saveProduct(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <>
    <div className={`${CommonStyles.formContainer} ${CommonStyles.productContainer}`}>
      <div className={CommonStyles.formHeader}>
        <h3>{id ? "Edit Product" : "Add Product"}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={CommonStyles.productWrapper}>
          <div className={CommonStyles.leftWrapper}>
            <div className={CommonStyles.formGroup}>
              <label className={CommonStyles.formLabel}>Name</label>
              <input
                className={CommonStyles.formControl}
                placeholder="Name"
                value={formData.name}
                onChange={(e)=> { 
                  setFormData(prev => ({...prev,name:e.target.value}))
                  validateField("name", e.target.value);
                }}
              />
              <div className={CommonStyles.error}>
                {errors?.name ? `* ${errors.name}` : ''}
              </div>
            </div>
            <div className={CommonStyles.formGroup}>
              <label className={CommonStyles.formLabel}>Description</label>
              <textarea
                className={CommonStyles.formControl}
                placeholder="Description"
                value={formData.description}
                onChange={(e)=>setFormData({...formData,description:e.target.value})}
                onKeyUp={(e)=>clearError("description")}
              />
              <div className={CommonStyles.error}>
                {errors?.description ? `* ${errors.description}` : ''}
              </div>
            </div>
            <div className={CommonStyles.formGrid}>
              {/* LEFT SIDE */}
              
                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Select Category</label>
                  <select 
                    className={CommonStyles.formControl}
                    value={formData.categoryId}
                    onChange={(e) => {
                      handleCategoryAttributes(e);
                      validateField("categoryId", e.target.value);
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  <div className={CommonStyles.error}>
                    {errors?.categoryId ? `* ${errors.categoryId}` : ''}
                  </div>
                </div>
                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Select brand</label>
                  <select
                    className={CommonStyles.formControl}
                    value={formData?.brandId || ""}
                    onChange={(e) =>
                      {
                        setFormData(prev => ({ ...prev,  brandId: e.target.value }))
                        validateField("brandId", e.target.value);
                      }
                    }
                    onKeyUp={(e)=>clearError("brandId")}
                  >
                    <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option
                          key={brand._id}
                          value={brand._id}
                        >
                          {brand.name}
                        </option>
                      ))}
                  </select>
                  <div className={CommonStyles.error}>
                    {errors?.brandId ? `* ${errors.brandId}` : ''}
                  </div>
                </div>
            </div>
            <Variants 
              formData={formData} 
              setFormData={setFormData} 
              selectedColors={selectedColors} 
              setColors={setColors} 
              clearError={clearError}
              key={variantResetKey}
            />

            <div className={CommonStyles.formGroup}>
              <label className={CommonStyles.formLabel}>
                <h3>Manufacturer details</h3>
              </label> 

              <div className={CommonStyles.formGrid}>
                <div className={CommonStyles.formGroup}>
                  <label>Generic name</label>
                  <input
                    type="text"
                    placeholder="Generic Name"
                    className={CommonStyles.formControl}
                    value={formData?.details?.genericName || ""}
                    onChange={(e)=>
                      { 
                        setFormData(prev => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          genericName: e.target.value
                        }
                        
                      }))
                      validateField("genericName", e.target.value);
                      }
                    }
                  />
                  <div className={CommonStyles.error}>
                    {errors?.genericName ? `* ${errors.genericName}` : ''}
                  </div>
                </div>

                <div className={CommonStyles.formGroup}>
                  <label>Country of origin</label>
                  <select 
                    className={CommonStyles.formControl}
                    value={formData?.details?.countryOfOrigin || ""}
                    onChange={(e)=>
                      { 
                        setFormData(prev => ({
                          ...prev,
                          details: {
                            ...prev.details,
                            countryOfOrigin: e.target.value
                          }
                          })
                        )
                        validateField("countryOfOrigin", e.target.value);
                      }
                    }
                  >
                    <option value="">Select Country</option>
                    {
                      countryConfig.countries.map(c => {
                        return (
                          <option 
                            key={c.shortCode} value={c.shortCode}>{c.name}</option>
                        );
                      })
                    }
                  </select>
                  <div className={CommonStyles.error}>
                    {errors?.countryOfOrigin ? `* ${errors.countryOfOrigin}` : ''}
                  </div>
                </div>

                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Manufacturer Name</label>
                  <input 
                    className={CommonStyles.formControl} 
                    type="text" 
                    placeholder="Manufacturer Name"
                    value={formData?.details?.manufacturedBy || ""}
                    onChange={(e)=> 
                      {
                        setFormData( prev => ({
                          ...prev,
                          details: {
                            ...prev.details,
                            manufacturedBy: e.target.value
                          }
                        }))
                        validateField("manufacturedBy", e.target.value);
                      }
                    }
                  />
                  <div className={CommonStyles.error}>
                    {errors?.manufacturedBy ? `* ${errors.manufacturedBy}` : ''}
                  </div>
                </div>

                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Manufacturer Address</label>
                  <textarea
                    className={CommonStyles.formControl} 
                    placeholder="Manufacturer Address"
                    value={formData?.details?.manufacturerAddress || ""}
                    onChange={(e)=> 
                      {
                        setFormData( prev => ({
                          ...prev,
                          details: {
                            ...prev.details,
                            manufacturerAddress: e.target.value
                          }
                        }))
                        validateField("manufacturerAddress", e.target.value);
                      }
                    }
                  ></textarea>
                  <div className={CommonStyles.error}>
                    {errors?.manufacturerAddress ? `* ${errors.manufacturerAddress}` : ''}
                  </div>
                </div>
                
                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Packer Name</label>
                  <input 
                    className={CommonStyles.formControl} 
                    type="text" 
                    placeholder="Packer Name"
                    value={formData?.details?.packedBy || ""}
                    onChange={(e)=> 
                      {
                        setFormData(prev => ({
                          ...prev,
                          details: {
                            ...prev.details,
                            packedBy: e.target.value
                          }
                        }))
                        validateField("packedBy", e.target.value);
                      }
                    }
                  />
                  <div className={CommonStyles.error}>
                    {errors?.packedBy ? `* ${errors.packedBy}` : ''}
                  </div>
                </div>

                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Packer Address</label>
                  <textarea
                    className={CommonStyles.formControl} 
                    type="text" 
                    placeholder="Packer Address"
                    value={formData?.details?.packerAddress || ""}
                    onChange={(e)=> 
                      {
                        setFormData(prev => ({
                          ...prev, 
                          details: {
                            ...prev.details,
                            packerAddress: e.target.value
                          }
                        }))
                        validateField("packerAddress", e.target.value);
                      }
                    }
                  ></textarea>
                  <div className={CommonStyles.error}>
                    {errors?.packerAddress ? `* ${errors.packerAddress}` : ''}
                  </div>
                </div>
                
              </div>

            </div>
          </div>
          {
            selectedColors.length > 0 ?
              <div className={CommonStyles.rightWrapper}>
                <AddEditImages 
                  selectedColors={selectedColors} 
                  formData={formData} 
                  setFormData={setFormData}
                  errors={errors}
                />
                
              </div> 
            : ""
          }
        </div>
        <button className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnPrimary}`}>Save</button>
      </form>
    </div>
    <Popup
      open={showPopup}
      type={popupType}
      message={popupMessage}
      onClose = {() => {
          setShowPopup(false);
          if (popupType === "success") {
              navigate(config.redirect);
          }
      }}
    />
  </>  
  );
}