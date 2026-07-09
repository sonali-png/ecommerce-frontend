import { useEffect, useState } from "react";
import useCommonList from "../../../hooks/useCommonList";
import '../../Admin/css/style.css';
import { NavLink } from "react-router-dom";

export default function ProductList() {
  const { records:products, loading, fetchRecords } = useCommonList("products");  
  return (
    <div className="content-wrapper">
      {
      products && <div className="table-container">
      <h2 className="table-title">Products List</h2>
      
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
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
                    <img
                      src={item?.colorImages?.[0].images?.[0].url || "/no-image.png"}
                      alt={item.name}
                      className="product-img"
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                    <NavLink to={`/admin/products/edit/${item._id}`} >Edit</NavLink>
                    {/* <button onClick={()=>deleteProduct(item._id)}>Delete</button> */}
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
    </div>
    }
    </div>
  )
}
