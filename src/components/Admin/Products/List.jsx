import { useEffect, useState } from "react";
import axios from "axios";
import adminApi from "../../../api/adminApi";
import '../../Admin/css/style.css';
import { NavLink } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const fetchRecords = async () => {
    try {
        const response = await adminApi.post('/api/fetchRecords', {
            collectionName:'products'
        }, {withCredentials:true});
        console.log(`response : ${JSON.stringify(response, null,2)}`);
        if (
            typeof response.data !== "undefined" &&
            response.data.length > 0
        ) {
            setProducts(response.data);
        } else {
            setProducts([]); // optional reset
        }
    } catch (error) {
        console.log("Error while fetching products");
    } finally {
    }
  };
  const deleteProduct = async (prodId) => {
    try {
        await adminApi.delete("/api/deleteRecord", {
            data: {
                collectionName: "products",
                id: prodId,
            },
        });
        setProducts((prev) => prev.filter((item) => item._id !== prodId));
    } catch (error) {
      console.log("Delete error", error);
    }
  };
  
  useEffect(() => {
      fetchRecords();
  }, []);
  return (
    <div className="content-wrapper">
        {
        products && <div className="table-container">
      {/* <h2 className="table-title">Products List</h2> */}

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
                  <img
                    src={item?.images[0]}
                    alt={item.name}
                    className="product-img"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                    <NavLink to={`/admin/products/edit/${item._id}`} >Edit</NavLink>
                    <button onClick={()=>deleteProduct(item._id)}>Delete</button>
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
