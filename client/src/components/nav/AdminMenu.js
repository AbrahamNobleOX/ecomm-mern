import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useLogout } from "../utils/Logout";

export default function AdminMenu() {
  // context
  const [auth, setAuth] = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Logout hook
  const handleLogout = useLogout();

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "" : "hide"}`}>
        <h2>Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/dashboard/${auth?.user?.role === 1 ? "admin/" : "user/"}`}
            >
              Dashboard<span className="badge bg-primary mx-2">5</span>
            </NavLink>
          </li>
          <hr className="my-1" />
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/admin/category">
              Create Categories
              <span className="badge bg-success mx-2">3</span>
            </NavLink>
          </li>
          <hr className="my-1"></hr>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/admin/product">
              Create Products
              <span className="badge bg-danger mx-2">1</span>
            </NavLink>
          </li>
          <hr className="my-1"></hr>
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <li className="list-group-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#settingsSubMenu"
              role="button"
              aria-expanded="false"
              aria-controls="settingsSubMenu"
              onClick={toggleSubMenu}
            >
              Accout Settings
              <span className="toggle-icon mx-3">
                {isOpen ? (
                  <i className="bi bi-chevron-up"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </span>
            </a>
            <div className="collapse submenu" id="settingsSubMenu">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Password
                  </a>
                </li>
                <hr className="my-1" />
                <li className="nav-item d-flex justify-content-end">
                  <button
                    className="nav-link p-0 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right px-1" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
