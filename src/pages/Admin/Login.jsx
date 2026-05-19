import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import adminApi from '../../api/adminApi';
import "../../css/login.css";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
    const {setAdmin} = useAdminAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await adminApi.post('/admin/login', 
                {
                    email:email, 
                    password:password
                } , {
                    withCredentials:true
                });
            adminApi.defaults.headers.common["Authorization"] = `Bearer ${result.data.adminAccessToken}`;
            localStorage.setItem("adminAccessToken", result.data.adminAccessToken);
            console.log(`result.data.user : ${JSON.stringify(result.data.user, null, 2)}`);
            setAdmin(result.data.user);
            navigate("/admin/dashboard");
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError("Something went wrong");
          }
        }
    }
    
  return (
    <div className="bgf-login-wrapper">
      <div className="login-form">
        <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <div className="btn-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
    </div>
  );
}
