import React, { useState } from "react";
import { Link } from "react-router-dom";

import userApi from "../api/userApi";
import LoginStyle from "../css/login.module.css";
import useCompleteAuthentication from "../hooks/useCompleteAuthentication";
import bannerImg from "../images/bagifyLoginBanner.png";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const completeAuthentication = useCompleteAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await userApi.post(
        "/login",
        {
          userId: userId.trim(),
          email: email.trim(),
          password,
        },
        { withCredentials: true }
      );

      await completeAuthentication(data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={LoginStyle.bgfLoginWrapper}>
      <div className={LoginStyle.loginForm}>
        <div className={LoginStyle.bannerImage}>
          <img
            src={bannerImg}
            alt="Bagify fashion shopping"
          />
        </div>

        <div className={LoginStyle.form}>
          <div className={LoginStyle.heading}>
            SignIn
          </div>

          <form onSubmit={handleLogin}>
            <div className={LoginStyle.inputGroup}>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError("");
                }}
                placeholder="Enter your user ID"
                autoComplete="username"
              />
            </div>

            <div className={LoginStyle.inputGroup}>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className={LoginStyle.inputGroup}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p
                className={LoginStyle.errorText}
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          <p className={LoginStyle.authSwitchText}>
            New to Bagify?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}