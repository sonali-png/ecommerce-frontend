import { useState, useEffect } from "react";
import adminApi from "../api/adminApi";

export default function useCommonList1(collectionName, id=null, whereClause=null) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecordsNew = async () => {
        try {
            setLoading(true);

            const response = await adminApi.post("/api/fetchRecords/",
                { collectionName, id, whereClause},
                { withCredentials: true}
            );

            setRecords(response.data || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (collectionName) {
            fetchRecordsNew();
        }
        
    }, [collectionName, id, whereClause]);

    return {
        records,
        loading,
        error,
        fetchRecordsNew,
        setRecords
    };
}