import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../api/api';
import "./login.css";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setWishlist } from "../redux/wishlistSlice";
import { getWishlist, mergeWishlist} from "../api/wishlist";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/login", 
                        { 
                          username: username,
                          email:email, 
                          password: password 
                        }, {
                          withCredentials:true
                        });
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      
      const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      await mergeWishlist(localWishlist);
      
      const wishlistResult = await getWishlist();
      dispatch(setWishlist(wishlistResult.data.products.map(p => p._id)));

      navigate(from, { replace: true });
    } catch(error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bgf-login-wrapper">
      <div className="login-form">
        <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input 
                type="username" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
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