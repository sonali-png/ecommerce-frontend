import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import styles from "../../css/Admin/Style.module.css";

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

  return (
    <>
      <div className={styles.sidebarOverlay}></div>

      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>AdminPanel</div>

          <button className={styles.closeBtn}>
            &times;
          </button>
        </div>

        <nav className={styles.navMenu}>
          {menus.map((menu) => (
            <div key={menu.key}>
              <div
                className={styles.menuTitle}
                onClick={() =>
                  setOpen(open === menu.key ? "" : menu.key)
                }
              >
                {menu.title}
              </div>

              {open === menu.key && (
                <div className={styles.submenu}>
                  {menu.links.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.end}
                      className={({ isActive }) =>
                        `${styles.link} ${
                          isActive ? styles.activeLink : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="#" className={styles.logout}>
            Logout
          </a>
        </nav>
      </aside>
    </>
  );
}