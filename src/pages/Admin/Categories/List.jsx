import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommonList from "../../../hooks/useCommonList";
import FilterBar from "../../../components/Admin/FilterBar";
import DataTable from "../../../components/Admin/DataTable";
import { categoryConfig } from "../../../config/categoryConfig";

export default function CategoryList() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10;
    const offset = (page - 1) * limit;

    const {
        records: categories,
        loading,
        totalRecords
    } = useCommonList("categories",{
        limit,
        offset,
        search: filters.search,
        whereClause: {
          slug: filters.slug,
          status: filters.status
        }
    });

    return (
        <>
            <FilterBar
                controls={categoryConfig.filters}
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
                columns={categoryConfig.columns}
                collectionName="categories"
                records={categories}
                loading={loading}
                page={page}
                offset={offset}
                limit={limit}
                totalRecords={totalRecords}
                onEdit={(row)=>
                  navigate(`/admin/categories/edit/${row._id}`)
                }
                setPage={setPage}
            />

        </>
  )
}