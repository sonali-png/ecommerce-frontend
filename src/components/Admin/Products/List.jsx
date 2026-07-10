import { useEffect, useState } from "react";
import useCommonList from "../../../hooks/useCommonList";
import '../../Admin/css/style.css';
import { NavLink } from "react-router-dom";

export default function ProductList() {
  const { records:products, loading, fetchRecords } = useCommonList("products");  
  return (
    <>
    {
      products && 
      <>
      <div className="filter-bar">
        <input type="text" className="form-control filter-search" placeholder="Search by productname or productcode" />
        
      </div>
        
      <div className="filter-group"> 
        <div className="filter-bar">
          <select className="form-control filter-select">
            <option value="">Select category</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
          <select className="form-control filter-select">
            <option value="">Select brand</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div className="table-section">
        <table className="table-wrapper">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {products && products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="img-std small-img-box">
                      {item.name}
                      {/* <img
                        src={item?.colorImages?.[0].images?.[0].url || "/no-image.png"}
                        alt={item.name}
                        className="product-img"
                      /> */}
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.categorySlug}</td>
                  
                  <td><span class="status active-status">{item.status === true ? 'Active': 'Inactive'}</span></td>
                  <td class="text-right">
                    <button class="btn btn-sm btn-outline"><NavLink to={`/admin/products/edit/${item._id}`} >Edit</NavLink></button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No products found
                </td>
              </tr>
            )}
          </tbody>

        </table>
        <div class="pagination-container">
          <span class="text-muted">Showing 1 to 10 of 43 entries</span>
          <div class="pagination-buttons">
            <button class="btn btn-sm btn-outline" disabled>Previous</button>
            <button class="btn btn-sm btn-outline active">1</button>
            <button class="btn btn-sm btn-outline">2</button>
            <button class="btn btn-sm btn-outline">Next</button>
          </div>
        </div>
      </div>
      </>
    }
  </>
  )
}
