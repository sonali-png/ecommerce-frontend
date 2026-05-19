import { useState, useEffect } from "react";
import adminApi from "../../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import "../../Admin/css/style.css";

export default function AddEdit() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeColors, setActiveColors] = useState([]);
  const {id} = useParams();

  const toggleAccordion = (color) => {
  setActiveColors(prev =>
    prev.includes(color)
      ? prev.filter(c => c !== color)
      : [...prev, color]
  );
};
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    variants: [],
    colorImages: []
  });

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  // ✅ Load categories
  useEffect(() => {
    if (id) { 
      fetchProduct(); 
    }
    const fetchCategories = async () => {
      const res = await adminApi.get("/categories/");
      setCategories(res?.data?.categories || []);
    };
    fetchCategories();
  }, [id]);

  const handleColorCheckbox = (index, color) => {
  const updated = [...formData.variants];
  const colorsArr = updated[index].colors || [];

  if (colorsArr.includes(color)) {
    updated[index].colors = colorsArr.filter(c => c !== color);
  } else {
    updated[index].colors = [...colorsArr, color];
  }

  setFormData(prev => ({ ...prev, variants: updated }));
};
  // ✅ Category change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const categoryData = categories.find(c => c._id === categoryId);
    setSelectedCategory(categoryId);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      variants: [
        ...prev.variants,
        { size: "", color: "", price: "", discount: "", stock: "" }
      ],
      colorImages: []
    }));

    setSizes(categoryData?.attributes?.sizes || []);
    setColors(categoryData?.attributes?.colors || []);
  };

  // ✅ Add empty variant
  const addEmptyVariant = () => {
    
    if(selectedCategory) {
      setFormData(prev => ({
        ...prev,
        variants: [
          ...prev.variants,
          { size: "", color: "", price: "", discount: "", stock: "" }
        ]
      }));
    } else {
      console.log(`Please select category`);
    }
    
  };

  // ✅ Remove variant
  const removeVariant = (index) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  // ✅ Variant change
  const handleVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;

    const current = updated[index];

    const isDuplicate = updated.some((v, i) => 
      i !== index &&
      v.size === current.size &&
      v.color === current.color &&
      current.size &&
      current.color
    );

    if (isDuplicate) {
      alert("Variant already exists!");
      return;
    }

    setFormData(prev => ({ ...prev, variants: updated }));
  };

  // ✅ Add color section
  const handleAddColor = (color) => {
    if (!color) return;

    const exists = formData.colorImages.find(c => c.color === color);
    if (exists) return;

    setFormData(prev => ({
      ...prev,
      colorImages: [
        ...prev.colorImages,
        { color, images: [] }
      ]
    }));
  };

  // ✅ Handle image upload
  const handleImageChange = (color, files) => {
    const fileArray = Array.from(files);

    setFormData(prev => ({
      ...prev,
      colorImages: prev.colorImages.map(c =>
        c.color === color
          ? { ...c, images: [...c.images, ...fileArray] }
          : c
      )
    }));
  };


  const fetchProduct = async () => {
     try { 
        const res = await adminApi.post("/api/getSingleRecord", { collectionName: "products", id, }); 
        const data = res.data.data; 
        setFormData({ 
            name: data.name || "", 
            description: data.description || "", 
            category: data.category || "", 
            brand: data.brand || "", 
            images: data.images || [""], 
            variants: data.variants?.length > 0 ? data.variants : formData.variants, 
        }); 
    } catch (err) { 
        console.log(err); 
    } 
  }; 
  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();  
    const structuredData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      brand: formData.brand,
      variants: formData.variants,
      colorImages: formData.colorImages.map(c => ({
        color: c.color,
        images: []
      }))
    };
    payload.append("collectionName", "products");
    payload.append("data", JSON.stringify(structuredData));
    formData.colorImages.forEach((c, i) => {
      c.images.forEach((img) => {
        payload.append(`images_${i}`, img); // ⭐ IMPORTANT
      });
    });

    try {
      if (id) {
        await adminApi.put(`/api/updateProduct/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await adminApi.post(
          "/api/addRecord", 
          payload
        );
      }
      navigate("/admin/products");
    } catch  (error) {
      console.error("Error saving product:", error);
    }
  };

  const removeImage = (color, index) => {
  setFormData(prev => ({
    ...prev,
    colorImages: prev.colorImages.map(c => {
      if (c.color !== color) return c;

      const updatedImages = c.images.filter((_, i) => i !== index);
      return { ...c, images: updatedImages };
    })
  }));
};

  return (
    <div className="form-container">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="form-input-wrapper">
        <div className="form-fields">
          {/* LEFT SIDE */}
          <div className="column1">

            <input
              placeholder="Name"
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />

            <textarea
              placeholder="Description"
              onChange={(e)=>setFormData({...formData,description:e.target.value})}
            />

            <select value={formData.category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <input
              placeholder="Brand"
              onChange={(e)=>setFormData({...formData,brand:e.target.value})}
            />

            <button type="button" onClick={addEmptyVariant}>
              + Add Variant
            </button>

            {/* VARIANT TABLE */}
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {formData.variants.map((v,index)=>(
                  <tr key={index}>
                    <td>
                      <select 
                        value={v.size}
                        onChange={(e)=>handleVariantChange(index,"size",e.target.value)}
                      >
                        <option value="">Select Size</option>
                        {sizes.map((s,i)=> <option key={i}>{s}</option>)}
                      </select>
                    </td>

                    <td className="color-td">
                      {colors.map((c, i) => (
                        <label key={i} style={{ marginRight: "10px" }}>
                          <input
                            className="color-checkboxes"
                            type="checkbox"
                            checked={v.colors?.includes(c)}
                            onChange={() => handleColorCheckbox(index, c)}
                          />
                          {c}
                        </label>
                      ))}
                    </td>

                    <td>
                      <input type="number"
                        value={v.price}
                        onChange={(e)=>handleVariantChange(index,"price",e.target.value)}
                      />
                    </td>

                    <td>
                      <input type="number"
                        value={v.discount}
                        onChange={(e)=>handleVariantChange(index,"discount",e.target.value)}
                      />
                    </td>

                    <td>
                      <input type="number"
                        value={v.stock}
                        onChange={(e)=>handleVariantChange(index,"stock",e.target.value)}
                      />
                    </td>

                    <td>
                      <button type="button" onClick={() => removeVariant(index)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT SIDE */}
          <div className="column2">
            <h3>Add Images by Color</h3>

            {colors.map((color, i) => {
              const colorData = formData.colorImages.find(c => c.color === color);
              const isOpen = activeColors.includes(color);

              return (
                <div key={i} className="accordion-item">

                  {/* HEADER */}
                  <div
                    className="accordion-header"
                    onClick={() => toggleAccordion(color)}
                  >
                    <span>{color}</span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {/* BODY */}
                  {isOpen && (
                    <div className="accordion-body">

                      {!colorData && (
                        <button type="button" onClick={() => handleAddColor(color)}>
                          Add Images
                        </button>
                      )}

                      {colorData && (
                        <>
                          {/* Upload */}
                          <input
                            type="file"
                            multiple
                            onChange={(e) => {
                              handleImageChange(color, e.target.files);
                              e.target.value = null;
                            }}
                          />

                          {/* Preview */}
                          <div className="image-list">
                            {colorData.images.map((img, idx) => (
                              <div key={idx} className="image-item">
                                <span>{img.name}</span>

                                <button
                                  type="button"
                                  onClick={() => removeImage(color, idx)}
                                >
                                  ❌
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>


        </div>
        <button className="submit-btn">Save</button>
      </form>
    </div>
  );
}