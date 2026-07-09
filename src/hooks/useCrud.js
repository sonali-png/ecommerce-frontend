import adminApi from "../api/adminApi";

export default function useCrud() {

    const addRecord = async (payload) => {
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
    };

    const updateRecord = async (payload) => {
        
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
    };

    const deleteRecord = async (id, collectionName) => {
        const response = await adminApi.delete(`/api/deleteRecord/${id}/${collectionName}`);
        return response.data;
    };

    return {
        addRecord,
        updateRecord,
        deleteRecord
    };
}