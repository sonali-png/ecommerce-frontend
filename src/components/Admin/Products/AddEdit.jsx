import { useState, useEffect } from "react";
import useCommonList from "../../../hooks/useCommonList";
import { useNavigate, useParams } from "react-router-dom";
import "../../Admin/css/style.css";
import "../../Admin/css/newAdmin.css";
import Variants from "./Variants";
import useCrud from "../../../hooks/useCrud";
import AddEditImages from "./AddEditImages";

export default function AddEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {records:categories } = useCommonList("categories");
  const {records:brands } = useCommonList("brands");
  const {records:product  } = useCommonList("products", id);
  const { addRecord, updateRecord } = useCrud();
  const [selectedColors, setColors] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);

 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId:"",
    variants:[],
    specifications:[],
    colorImages: [],
    attributes:[]
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
        specifications: product.specifications || [],
        attributes: categories.find(c => c._id === product.categoryId)?.attributeIds || []
      });
      setColors((product?.colorImages || []).map(c => c.color));
    }
  }, [id, product]);

  const saveProduct = async (payload) => {
      if (id) {
          payload.append("id", id);
          await updateRecord(payload);
      } else {
          await addRecord(payload);
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
    const payload = new FormData();  
    const structuredData = {
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      categoryId: formData.categoryId,
      brandId: formData.brandId,
      variants: formData.variants,
      specifications: formData.specifications,
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
        navigate("/admin/products");
    } catch (error) {
        console.error(error);
    }
    
  };

  

  return (
    <div className="content-wrapper">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="form-input-wrapper">
        <div className="form-fields">
          {/* LEFT SIDE */}
          <div className="column1">

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e)=>setFormData({...formData,description:e.target.value})}
            />

            <textarea
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={(e)=>setFormData({...formData,shortDescription:e.target.value})}
            />

            <select 
              value={formData.categoryId}
              onChange={handleCategoryAttributes}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select
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
            <Variants formData={formData} setFormData={setFormData} selectedColors={selectedColors} setColors={setColors}/>
            
          </div>
            <AddEditImages selectedColors={selectedColors} formData={formData} setFormData={setFormData}/>
        </div>
        <button className="submit-btn">Save</button>
      </form>
    </div>
  );
}