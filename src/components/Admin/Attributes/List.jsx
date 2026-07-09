import useCommonList from "../../../hooks/useCommonList";
import useCrud from "../../../hooks/useCrud";
import { NavLink } from "react-router-dom";

export default function List() {
    const {
        records,
        loading,
        fetchRecords
    } = useCommonList("attributes");

    const { deleteRecord } = useCrud();

    const handleDelete = async (id) => {
        try {
            await deleteRecord(id);
            fetchRecords();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
    <div className="content-wrapper">
      {
      records && <div className="table-container">
      <h2 className="table-title">Category List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                    <NavLink to={`/admin/attributes/edit/${item._id}`} >Edit</NavLink>
                    <button onClick={()=>deleteRecord(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No attributes found
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