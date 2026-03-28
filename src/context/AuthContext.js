import {createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const loadUser = async () => {
            try {
                const {data} =  await api.get("/getuserdata", {
                    withCredentials:true
                });
                console.log(`Data from auth : ${data}`);
                setUser(data.user);
            } catch {
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