import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";
import styles from "../../css/Admin/Login.module.css";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { setAdmin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await adminApi.post(
        "/admin/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      adminApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.adminAccessToken}`;

      localStorage.setItem(
        "adminAccessToken",
        result.data.adminAccessToken
      );

      setAdmin(result.data.user);

      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.adminLoginWrapper}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.btnGroup}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}