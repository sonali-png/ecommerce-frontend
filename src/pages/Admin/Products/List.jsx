import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommonList from "../../../hooks/useCommonList";
import FilterBar from "../FilterBar";
import DataTable from "../DataTable";
import { productConfig } from "../config/productConfig";

export default function ProductsList() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10;
    const offset = (page - 1) * limit;

    const {
        records: products,
        loading,
        totalRecords
    } = useCommonList("products",{
        limit,
        offset,
        search: filters.search,
        whereClause: {
            categorySlug: filters.category,
            brandSlug: filters.brand,
            status: filters.status
        }
    });

    return (
        <>
            <FilterBar
                controls={productConfig.filters}
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
                columns={productConfig.columns}
                collectionName="products"
                records={products}
                loading={loading}
                page={page}
                offset={offset}
                limit={limit}
                totalRecords={totalRecords}
                onEdit={(row)=>
                    navigate(`/admin/products/edit/${row._id}`)
                }
                setPage={setPage}
            />

        </>
  )
}