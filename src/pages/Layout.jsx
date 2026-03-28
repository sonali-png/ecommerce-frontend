import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpenLogin = () => {
    if (location.pathname === "/login") return;
    navigate("/login");
  };

  return (
    <>
      <Header openLogin={handleOpenLogin} />

      <div className="bgf-container">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </>
  );
}