import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCommonList from "../../../hooks/useCommonList";
import FilterBar from "../FilterBar";
import DataTable from "../DataTable";
import { attributeConfig } from "../config/attributeConfig";

export default function AttributesList() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const limit = 10;
    const offset = (page - 1) * limit;

    const {
        records: attributes,
        loading,
        totalRecords
    } = useCommonList("attributes",{
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
                controls={attributeConfig.filters}
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
                columns={attributesConfig.columns}
                collectionName="attributes"
                records={attributes}
                loading={loading}
                page={page}
                offset={offset}
                limit={limit}
                totalRecords={totalRecords}
                onEdit={(row)=>
                  navigate(`/admin/attributes/edit/${row._id}`)
                }
                setPage={setPage}
            />

        </>
  )
}