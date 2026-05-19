import { createContext, useState, useEffect, useContext } from "react";
import adminApi from "../api/adminApi";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const loadAdmin = async () => {
            try {
                const { data } = await adminApi.get("/admin/getadmindata", {
                    withCredentials: true
                });

                console.log(`Data from admin auth :`, data);
                setAdmin(data.user);
            } catch (error) {
                setAdmin(null);
            }
        };
        loadAdmin();        
    }, []);

    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);