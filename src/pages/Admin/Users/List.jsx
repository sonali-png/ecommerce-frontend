import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommonList from "../../../hooks/useCommonList";
import DataTable from "../../../components/Admin/DataTable";
import FilterBar from "../../../components/Admin/FilterBar";
import { userConfig } from "../../../config/userConfig";

export default function UserList() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10;
    const offset = (page - 1) * limit;

    const {
        records: users,
        loading,
        totalRecords
    } = useCommonList("users",{
        limit,
        offset,
        search: filters.search,
        whereClause: {
          status: filters.status
        }
    });

    return (
        <>
            <FilterBar
                controls={userConfig.filters}
                filters={filters}
                onFilterChange={(name, value) => {
                    setFilters(prev => ({
                        ...prev,
                        [name]: value,
                    }));
                    setPage(1);
                }}
                setFilters={setFilters}
                setPage={setPage}
            />

            <DataTable 
                columns={userConfig.columns}
                collectionName="users"
                records={users}
                loading={loading}
                page={page}
                offset={offset}
                limit={limit}
                totalRecords={totalRecords}
                onEdit={(row)=>
                  navigate(`/admin/users/edit/${row._id}`)
                }
                setPage={setPage}
            />

        </>
  )
}