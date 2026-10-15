import React, { useState } from "react";
import { Link } from "react-router-dom";

import userApi from "../api/userApi";
import LoginStyle from "../css/login.module.css";
import useCompleteAuthentication from "../hooks/useCompleteAuthentication";
import bannerImg from "../images/bagifyLoginBanner.png";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const completeAuthentication = useCompleteAuthentication();

  const fullPhone = `+91${phone}`;

  const handleSendOtp = async (e) => {
    e?.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await userApi.post(
        "/auth/phone/send-otp",
        { phone: fullPhone },
        { withCredentials: true }
      );

      setOtpSent(true);
      setMessage(data.message || "OTP sent successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{4,8}$/.test(otp)) {
      setError("Please enter a valid OTP.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await userApi.post(
        "/auth/phone/verify-otp",
        {
          phone: fullPhone,
          otp,
          name: name.trim(),
        },
        { withCredentials: true }
      );

      await completeAuthentication(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "OTP verification or signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
  };

  const handleChangePhone = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
    setMessage("");
  };

  return (
    <div className={LoginStyle.bgfLoginWrapper}>
      <div className={LoginStyle.loginForm}>
        <div className={LoginStyle.bannerImage}>
          <img src={bannerImg} alt="Bagify fashion shopping" />
        </div>

        <div className={LoginStyle.form}>
          <div className={LoginStyle.heading}>
            {otpSent ? "Verify your mobile number" : "Signup"}
          </div>

          <form
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
          >
            {!otpSent ? (
              <>
                <div className={LoginStyle.inputGroup}>

                  <input
                    id="signupName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={LoginStyle.inputGroup}>
                  <div className={LoginStyle.bgfPhoneField}>
                    <span className={LoginStyle.bgfCountryCode}>
                      +91
                    </span>

                    <input
                      id="signupPhone"
                      type="tel"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        );
                        setError("");
                      }}
                      maxLength={10}
                      inputMode="numeric"
                      autoComplete="tel-national"
                      aria-label="10-digit mobile number"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Sending OTP..." : "CONTINUE"}
                </button>
              </>
            ) : (
              <>
                <p>
                  Enter the OTP sent to <strong>{fullPhone}</strong>.
                </p>

                <div className={LoginStyle.inputGroup}>
                  <label htmlFor="signupOtp">Enter OTP</label>

                  <input
                    id="signupOtp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={8}
                    value={otp}
                    onChange={(e) => {
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 8)
                      );
                      setError("");
                    }}
                    placeholder="Enter OTP"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "VERIFY & SIGN UP"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleChangePhone}
                >
                  Change phone number
                </button>
              </>
            )}

            {error && (
              <p className={LoginStyle.errorText} role="alert">
                {error}
              </p>
            )}

            {message && (
              <p
                className={LoginStyle.successText}
                role="status"
              >
                {message}
              </p>
            )}
          </form>

          <p className={LoginStyle.authSwitchText}>
            Already have an account?{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}