import React from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Footer";

import Styles from "../../css/Admin/Style.module.css";

export default function AdminLayout() {
  return (
    <>
      <div className={Styles.mainWrapper}>
        <AdminSidebar />

        <div className={`${Styles.mainContent} ${Styles.noSidebarOffset}`}>
          <AdminHeader />
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
}