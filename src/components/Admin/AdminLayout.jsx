import React from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Footer";

import CommonStyles from "../../css/Admin/Common.module.css";

export default function AdminLayout() {
  return (
    <>
      <div className={CommonStyles.mainWrapper}>
        <AdminSidebar />
        {/* ${CommonStyles.noSidebarOffset} */}
        <div className={`${CommonStyles.mainContent} `}>
          <AdminHeader />
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
}