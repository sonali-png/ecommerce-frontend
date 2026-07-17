// https://chatgpt.com/c/6a5608aa-4cfc-83e8-bc8d-09a48946d2ab


import { useEffect, useState } from "react";
import useCommonList from "../../../hooks/useCommonList";

import '../../Admin/css/style.css';
import { NavLink, useNavigate  } from "react-router-dom";
import Pagination from "../Pagination";
import FilterBar from "../FilterBar";
import DataTable from "../DataTable";
import { productConfig } from "../Config/productConfig";

export default function ProductList() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const deleteProduct = (row) => {
      console.log("Delete:", row);
  };

  const { records:products, loading, totalRecords,  fetchRecords } = useCommonList("products", 
    { 
      limit,
      offset: (page - 1) * limit,
      search: searchText
    }
  );  
  const { records: categories} = useCommonList("categories");

  const { records: brands } = useCommonList("brands");
  const totalPages = Math.ceil(totalRecords / limit);
  const start = totalRecords === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, totalRecords);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  const controls = [
    {
      type: "search",
      placeholder: "Search Product Name or SKU",
      value: searchText,
      onChange: (value) => {
        setSearchText(value);
        setPage(1);
      },
    },

    {
      type: "select",
      placeholder: "All Categories",
      value: category,
      onChange: (value) => {
        setCategory(value);
        setPage(1);
      },
      options: categories.map((c) => ({
        label: c.name,
        value: c.slug,
      })),
    },

    {
      type: "select",
      placeholder: "All Brands",
      value: brand,
      onChange: (value) => {
        setBrand(value);
        setPage(1);
      },
      options: brands.map((b) => ({
        label: b.name,
        value: b.slug,
      })),
    },

    {
      type: "select",
      placeholder: "Status",
      value: status,
      onChange: (value) => {
        setStatus(value);
        setPage(1);
      },
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  return (
    <>
    {
      products && 
      <DataTable

          columns={productConfig.columns}

          records={products}

          loading={loading}

          onEdit={(row)=>
          navigate(`/admin/products/edit/${row._id}`)
          }

          onDelete={deleteProduct}

      />
      // <>
      // <FilterBar
      //     controls={controls}
      //     onClear={() => {
      //         setSearchText("");
      //         setCategory("");
      //         setBrand("");
      //         setStatus("");
      //         setPage(1);
      //     }}
      // />
        
      // <div className="table-section">
      //   <table className="table-wrapper">
      //     <thead>
      //       <tr>
      //         <th>#</th>
      //         <th>Image</th>
      //         <th>Name</th>
      //         <th>Category</th>
      //         <th>Status</th>
      //         <th>Action</th>
      //       </tr>
      //     </thead>
          
      //     <tbody>
      //       {products && products.length > 0 ? (
      //         products.map((item, index) => (
      //           <tr key={item._id || index}>
      //             <td>{index + 1}</td>
      //             <td>
      //               <div className="img-std small-img-box">
      //                 {item.name}
      //                 {/* <img
      //                   src={item?.colorImages?.[0].images?.[0].url || "/no-image.png"}
      //                   alt={item.name}
      //                   className="product-img"
      //                 /> */}
      //               </div>
      //             </td>
      //             <td>{item.name}</td>
      //             <td>{item.categorySlug}</td>
                  
      //             <td><span className="status active-status">{item.status === true ? 'Active': 'Inactive'}</span></td>
      //             <td className="text-right">
      //               <button className="btn btn-sm btn-outline">
      //                 <NavLink to={`/admin/products/edit/${item._id}`} >Edit</NavLink>
      //               </button>
      //               <button className="btn btn-sm btn-danger">Delete</button>
      //             </td>
      //           </tr>

      //         ))
      //       ) : (
      //         <tr>
      //           <td colSpan="6" className="no-data">
      //             No products found
      //           </td>
      //         </tr>
      //       )}
      //     </tbody>

      //   </table>
      //   <Pagination
      //     page={page}
      //     start={start}
      //     end={end}
      //     limit={limit}
      //     totalRecords={totalRecords}
      //     onPageChange={setPage}
      //   />
      // </div>
      // </>
    }
  </>
  )
}
