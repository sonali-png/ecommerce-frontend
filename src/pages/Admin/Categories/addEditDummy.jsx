// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../Admin/css/style.css";
// import useCommonList from "../../../hooks/useCommonList";
// import useCrud from "../../../hooks/useCrud";

// export default function AddEdit() {
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const { records:categories } = useCommonList("categories");
//     const { records:attributeList } = useCommonList("attributes");
//     const [isParent, setIsParent] = useState(false);
//     const { addRecord, updateRecord } = useCrud();

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         slug: "",
//         parentCategory: "",
//         attributeIds:[]
//     });

//     const handleAttributeChange = (attributeId) => {
//         setFormData(prev => {
//             const exists = prev.attributeIds.find(a => a._id === attributeId);
//             return {
//                 ...prev,
//                 attributeIds: exists
//                     ? prev.attributeIds.filter(a => a._id !== attributeId)
//                     : [...prev.attributeIds, { _id: attributeId }]
//             };
//         }
//         );
//     };
//     const saveAttribute = async (payload) => {
//         if (id) {
//             payload.append("id", id);
//             await updateRecord(payload);
//         } else {
//             await addRecord(payload);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = new FormData();

//         payload.append("collectionName", "categories");
//         payload.append(
//             "data",
//             JSON.stringify({
//                 ...formData,
//                 parentCategory: isParent
//                     ? null
//                     : formData.parentCategory
//             })
//         );

//         try {
//             await saveAttribute(payload);
//             navigate("/admin/categories");
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     useEffect(() => {
//         if (!id) return;
//         const category = categories.find(item => item._id === id);
//         setIsParent(!category?.parentCategory);
//         if(category) {
//             setFormData({
//                 name: category.name,
//                 description: category.description,
//                 slug: category.slug,
//                 parentCategory: category?.parentCategory,
//                 attributeIds:category.attributeIds
                
//             })
//         }
//         console.log(formData?.attributeIds);
//     }, [id, categories]);

//     return (
//         <div className="content-wrapper">
//         <h2>{id ? "Edit Category" : "Add Category"}</h2>
//             <form onSubmit={handleSubmit} className="form-input-wrapper">
//                 <div className="form-fields">
//                     <div className="column1">
//                         <div className="input-box">
//                             <input
//                                 placeholder="Name"
//                                 value={formData.name}
//                                 onChange={(e)=>setFormData({...formData,name:e.target.value})}
//                             />
//                         </div>
//                         <div className="input-box">
//                             <input
//                                 placeholder="Slug"
//                                 value={formData.slug}
//                                 onChange={(e)=>setFormData({...formData,slug:e.target.value})}
//                             />
//                         </div>
//                         <div className="input-box">
//                             <textarea
//                                 value={formData.description}
//                                 placeholder="Description"
//                                 onChange={(e)=>setFormData({...formData,description:e.target.value})}
//                             />
//                         </div>


//                         <div className="input-box">
//                             <div className="checkbox-wrapper">
//                                 <label className="checkbox-label">
//                                     <input
//                                         type="checkbox"
//                                         checked={isParent}
//                                         onChange={(e) => {
//                                             setIsParent(e.target.checked);
//                                             if (e.target.checked) {
//                                                 setFormData(prev => ({
//                                                     ...prev,
//                                                     parentCategory: ""
//                                                 }));
//                                             }
//                                         }}
//                                     />
//                                     <span>Is Parent ?</span>
//                                 </label>
//                             </div>
//                         </div>


//                         {
//                             !isParent && <div className="input-box">
//                                 <select
//                                     value={formData.parentCategory}
//                                     onChange={(e) =>
//                                         setFormData(prev => ({
//                                             ...prev,
//                                             parentCategory: e.target.value
//                                         }))
//                                     }
//                                 >
//                                     <option value="">Select Category</option>

//                                     {categories.map(cat => (
//                                         <option
//                                             key={cat._id}
//                                             value={cat._id}
//                                         >
//                                             {cat.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         }

//                         <div className="input-box">
//                             <div className="attribute-list">
//                                 {attributeList.map(attr => (
//                                     <label
//                                         key={attr._id}
//                                         className="checkbox-item"
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             checked={formData?.attributeIds && formData?.attributeIds.find(item => item._id === attr._id)}
//                                             onChange={() =>
//                                                 handleAttributeChange(attr._id)
//                                             }
//                                         />
//                                         <span>{attr.name}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 <button type="submit" className="submit-btn">Save Attribute</button>

//             </form>
//         </div>
//     )
// }
