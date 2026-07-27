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
  const {records:product  } = useCommonList("products", id);
  const { addRecord, updateRecord } = useCrud();
  const [selectedColors, setColors] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [errors, setErrors] = useState("");
  
  const clearError = (fieldName) => {
    setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
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
      manufacturerName: "",
      manufacturerAddress: "",
      packedBy:"",
      packerAddress:""
    }
  });

  useEffect(() => {
    if (id && product) {
       console.log(product.variants);
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
          manufacturerName: "",
          manufacturerAddress: "",
          packedBy: "",
          packerAddress: ""
        },
      });
      setColors((product?.colorImages || []).map(c => c.color));
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
      attributes: catAttributeData
    }));
  };


  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productConfig.validate) {
      const validationErrors = productConfig.validate(formData);
      console.log(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
      }
      return false;
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
      colorImages: formData?.colorImages.map(c => ({
        color: c.color,
        images: c.images
          .filter(img => !(img instanceof File))
          .map(img => ({
            url: img.url,
            public_id: img.public_id,
            alt: img.alt || "",
            isPrimary: img.isPrimary || false
          }))
      }))
    };
    payload.append("collectionName", "products");
    payload.append("data", JSON.stringify(structuredData));
    formData?.colorImages.forEach((c, i) => {
      c.images.forEach(img => {
        if (img instanceof File) {
          payload.append(`images_${i}`, img);
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
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
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
                    onChange={handleCategoryAttributes}
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
                    value={formData.brandId}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev,  brandId: e.target.value }))
                    }
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
                    value={formData?.details?.genericName}
                    onChange={(e)=>
                      setFormData(prev => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          genericName: e.target.value
                        }
                      }))
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
                    value={formData?.details?.countryOfOrigin}
                    onChange={(e)=>
                      setFormData({
                        ...prev,
                        details: {
                          ...prev.details,
                          countryOfOrigin: e.target.value
                        }
                      })
                    }
                  >
                    <option value="">Select Country</option>
                    {
                      countryConfig.countries.map(c => {
                        return (
                          <option key={c.shortCode} value={c.shortCode}>{c.name}</option>
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
                    onChange={(e)=> 
                      setFormData({
                        ...prev,
                        details: {
                          ...prev.manufacturerName,
                          manufacturerName: e.target.value
                        }
                      })
                    }
                  />
                  <div className={CommonStyles.error}>
                    {errors?.manufacturerName ? `* ${errors.manufacturerName}` : ''}
                  </div>
                </div>

                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Manufacturer Address</label>
                  <textarea
                    className={CommonStyles.formControl} 
                    placeholder="Manufacturer Address"
                    onChange={(e)=> 
                      setFormData({
                        ...prev,
                        details: {
                          ...prev.manufacturerAddress,
                          manufacturerAddress: e.target.value
                        }
                      })
                    }
                  ></textarea>
                  <div className={CommonStyles.error}>
                    {errors?.manufacturerAddress ? `* ${errors.genericName}` : ''}
                  </div>
                </div>
                
                <div className={CommonStyles.formGroup}>
                  <label className={CommonStyles.formLabel}>Packer Name</label>
                  <input 
                    className={CommonStyles.formControl} 
                    type="text" 
                    placeholder="Packer Name"
                    onChange={(e)=> 
                      setFormData({
                        ...prev,
                        details: {
                          ...prev.packerName,
                          packerName: e.target.value
                        }
                        })
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
                    onChange={(e)=> 
                      setFormData({
                        ...prev,
                        details: {
                          ...prev.packerAddress,
                          packerAddress: e.target.value
                        }
                      })
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
                <AddEditImages selectedColors={selectedColors} formData={formData} setFormData={setFormData}/>
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