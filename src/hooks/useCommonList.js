import { useState, useEffect } from "react";
import adminApi from "../api/adminApi";

export default function useCommonList(collectionName, options={}) {
    console.log("Inside");
    const  {
        id=null,
        whereClause={},
        limit=10,
        offset=0,
        sort={},
        search="",
        populate=[]
    } = options;
    
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await adminApi.post("/api/fetchRecordsNew/",
                { collectionName, options},
            );
            setRecords(response.data.data || []);
            setTotalRecords(response.data.totalRecords || 0);
        } catch (err) {
            setError(err);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("In usefeect ", collectionName);
        if (collectionName) {
            fetchRecords();
        }
        
    },  [
            collectionName,
            id,
            limit,
            offset,
            search,
            JSON.stringify(whereClause),
            JSON.stringify(sort),
            JSON.stringify(populate),
        ]
    );

    return {
        records,
        loading,
        error,
        totalRecords,
        fetchRecords,
        setRecords
    };
}