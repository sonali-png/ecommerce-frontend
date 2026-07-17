import React from "react";
import Pagination from "../Admin/Pagination";
import useCrud from "../../hooks/useCrud";
import CommonStyles from "../../css/Admin/Common.module.css";
import DTStyles from "../../css/Admin/DataTable.module.css";

export default function DataTable({
    collectionName,
    columns,
    records,
    loading,
    page,
    offset,
    limit,
    totalRecords,
    onEdit,
    setPage
}) {
    const { deleteRecord } = useCrud();
    const start = totalRecords === 0 ? 0 : offset + 1;
    const end = Math.min(offset + limit, totalRecords);

    const handleDelete = async(row) => {
        if(!window.confirm("Are you sure ??")) {
            return;
        }
        try {
            await deleteRecord(row._id, collectionName);
            fetchRecords();
        } catch(error) {
            console.log(error);
        }
    }

    if (loading)
        return <div>Loading...</div>;
        return (
            <>
                <table className={DTStyles.tableWrapper}>

                    <thead>

                        <tr>

                        {columns.map(col=>(
                            <th key={col.header}>
                            {col.header}
                            </th>
                        ))}
                        </tr>
                    </thead>

                    <tbody>

                    {
                        records.length===0 ?

                        <tr>
                            <td colSpan={columns.length}>
                            No Records Found
                            </td>
                        </tr> :

                        records.map((row,rowIndex)=>(

                            <tr key={row._id}>
                            {
                                columns.map((col,colIndex)=>{

                                    switch(col.type){

                                        case "serial":

                                            return (
                                                <td key={colIndex}>
                                                    {rowIndex+1}
                                                </td>
                                            );

                                        case "image":
                                            return(
                                                <td key={colIndex}>
                                                    <img
                                                    src={row.image}
                                                    width="50"
                                                    />
                                                </td>
                                        );

                                        case "status":

                                            return(
                                                <td key={colIndex}>
                                                    <span className={`${CommonStyles.status} ${row.status? CommonStyles.activeStatus : CommonStyles.pendingStatus}`}>
                                                    {row.status?"Active":"Inactive"}
                                                    </span>

                                                </td>
                                        );

                                        case "actions":

                                        return(
                                            <td key={colIndex}>
                                                <button className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnOutline}`} onClick={()=>onEdit(row)} >
                                                    Edit
                                                </button>

                                                <button className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnDanger}`} onClick={()=>handleDelete(row)} >
                                                    Delete
                                                </button>
                                            </td>
                                        );

                                        default:
                                            return(
                                                <td key={colIndex}>
                                                    {row[col.field]}
                                                </td>
                                            );

                                    }

                                })
                            }

                            </tr>

                        ))

                    }

                    </tbody>

                </table>
                <Pagination
                    page={page}
                    start={start}
                    end={end}
                    limit={limit}
                    totalRecords={totalRecords}
                    onPageChange={setPage}
                />
            </>
    );
}