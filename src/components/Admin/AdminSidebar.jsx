import React, { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const { admin } = useAdminAuth();
  const [open, setOpen] = useState("");

  if (!admin) return null;

  const menus = [
    {
      key: "products",
      title: "Products",
      links: [
        { label: "List", path: "/admin/products", end: true },
        { label: "Add", path: "/admin/products/add" },
      ],
    },
    {
      key: "attributes",
      title: "Attributes",
      links: [
        { label: "List", path: "/admin/attributes", end: true },
        { label: "Add", path: "/admin/attributes/add" },
      ],
    },
    {
      key: "categories",
      title: "Categories",
      links: [
        { label: "List", path: "/admin/categories", end: true },
        { label: "Add", path: "/admin/categories/add" },
      ],
    },
    {
      key: "users",
      title: "Users",
      links: [
        { label: "List", path: "/admin/users", end: true },
        { label: "Add", path: "/admin/users/add" },
      ],
    },
  ];

  const navLinkStyle = ({ isActive }) => ({
    ...styles.link,
    color: isActive ? "#dc2626" : "#000",
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "#f1f5f9" : "transparent",
  });

  return (
    <div style={styles.sidebar}>
      {menus.map((menu) => (
        <div key={menu.key}>
          <div
            style={styles.title}
            onClick={() =>
              setOpen(open === menu.key ? "" : menu.key)
            }
          >
            {menu.title}
          </div>

          {open === menu.key && (
            <div style={styles.submenu}>
              {menu.links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  style={navLinkStyle}
                  end={link.end}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>  
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    padding: "15px",
    borderRight: "1px solid #ccc",
  },
  title: {
    padding: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  submenu: {
    marginBottom: "10px",
  },
  link: {
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    borderBottom: "1px solid #ddd",
  },
};