import React, { useState } from "react";
import {useAdminAuth} from "../../context/AdminAuthContext";

export default function AdminSidebar() {
  const { admin} = useAdminAuth();
  console.log(`admin :${admin}`);
  const [open, setOpen] = useState("");

  const toggle = (menu) => {
    setOpen(open === menu ? "" : menu);
  };

  return (
    !(admin) ? <></> :  
    <div className='admin_sidebar' style={styles.sidebar}>
      
      {/* PRODUCTS */}
      <div>
        <div style={styles.title} onClick={() => toggle("products")}>
          Products
        </div>
        {open === "products" && (
          <div style={styles.submenu}>
            <div style={styles.link}>List</div>
            <div style={styles.link}>Add</div>
          </div>
        )}
      </div>

      {/* CATEGORIES */}
      <div>
        <div style={styles.title} onClick={() => toggle("categories")}>
          Categories
        </div>
        {open === "categories" && (
          <div style={styles.submenu}>
            <div style={styles.link}>List</div>
            <div style={styles.link}>Add</div>
          </div>
        )}
      </div>

      {/* USERS */}
      <div>
        <div style={styles.title} onClick={() => toggle("users")}>
          Users
        </div>
        {open === "users" && (
          <div style={styles.submenu}>
            <div style={styles.link}>List</div>
            <div style={styles.link}>Add</div>
          </div>
        )}
      </div>

    </div>
  );
}

/* Inline styles (pure React, no CSS file needed) */
const styles = {
  sidebar: {
    width: "250px",
    color: "black",
    padding: "15px",
    fontFamily: "Arial",
    borderRight: "1px solid grey"
  },
  title: {
    padding: "12px",
    marginBottom: "5px",
    cursor: "pointer",
    borderRadius: "6px",
  },
  submenu: {
    marginBottom: "10px",
    borderRadius: "6px",
    overflow: "hidden",
  },
  link: {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #1e293b",
  },
};