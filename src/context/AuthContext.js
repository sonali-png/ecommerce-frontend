import {createContext, useState, useEffect, useContext } from "react";
import userApi from "../api/userApi";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(()=> {
        const loadUser = async () => {
            const token = localStorage.getItem("userAccessToken");
            if (!token) {
                setUser(null);
                return;
            }
            try {
                
                const {data} =  await userApi.get("/getuserdata");
                console.log(`Data from auth : ${data}`);
                setUser(data.user);
            } catch (err) {
                console.log("Auth error:", err.response?.data);

                // 🔥 If token is invalid → clear it
                localStorage.removeItem("userAccessToken");
                setUser(null);
            }
        }
        loadUser();
    }, []);
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);