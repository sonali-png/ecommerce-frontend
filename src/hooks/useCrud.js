import { faL } from "@fortawesome/free-solid-svg-icons";
import adminApi from "../api/adminApi";
import { useState } from "react";
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function useCrud() {
    const [loading, setLoading] = useState(false);
    console.log(`Loading `, loading);
    const addRecord = async (payload) => {
        try {
            setLoading(true);
            await sleep(1000);
            const response = await adminApi.post(
                "/api/addRecord",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    const updateRecord = async (payload) => {
        try {
            setLoading(true);
            await sleep(1000);
            const response = await adminApi.patch(
                `/api/updateRecord`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            
            return response.data;
        } finally {
            setLoading(false);
        }
        
    };

    const deleteRecord = async (id, collectionName) => {
        try {
            setLoading(true);
            await sleep(1000);
            const response = await adminApi.delete(`/api/deleteRecord/${id}/${collectionName}`);
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        addRecord,
        updateRecord,
        deleteRecord
    };
}