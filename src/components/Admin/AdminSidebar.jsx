import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import CommonStyles from "../../css/Admin/Common.module.css";
import SidebarStyles from "../../css/Admin/Sidebar.module.css";

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
      <div className={SidebarStyles.sidebarOverlay}></div>

      <aside className={SidebarStyles.sidebar}>
        <div className={SidebarStyles.logoArea}>
          <div className={SidebarStyles.logo}>AdminPanel</div>

          <button className={CommonStyles.closeBtn}>
            &times;
          </button>
        </div>

        <nav className={SidebarStyles.navMenu}>
          {menus.map((menu) => (
            <div key={menu.key}>
              <div
                className={SidebarStyles.menuTitle}
                onClick={() =>
                  setOpen(open === menu.key ? "" : menu.key)
                }
              >
                {menu.title}
              </div>

              {open === menu.key && (
                <div className={SidebarStyles.submenu}>
                  {menu.links.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.end}
                      className={({ isActive }) =>
                        `${CommonStyles.link} ${
                          isActive ? CommonStyles.activeLink : ""
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

          <a href="#" className={SidebarStyles.logout}>
            Logout
          </a>
        </nav>
      </aside>
    </>
  );
}