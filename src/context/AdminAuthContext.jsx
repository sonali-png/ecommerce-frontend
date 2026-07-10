import { createContext, useState, useEffect, useContext } from "react";
import adminApi from "../api/adminApi";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadAdmin = async () => {
            try {
                console.log("Loading admin...");

                const { data } = await adminApi.get("/admin/getadmindata");

                console.log("Response:", data);

                setAdmin(data.user);
            } catch (err) {
                console.log("Error:", err.response?.status);
                console.log("Data:", err.response?.data);

                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        loadAdmin();
    }, []);

    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);