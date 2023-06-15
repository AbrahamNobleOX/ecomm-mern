import { NavLink, Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useLogout } from "../utils/Logout";

export default function AdminMenu() {
  // context
  const [auth, setAuth] = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Logout hook
  const handleLogout = useLogout();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm p-3 rounded fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img
              src="https://getbootstrap.com//docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top me-1"
            />
            Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
      <div className="col-md-2 p-0">
        <div className={`sidebar ${isSidebarOpen ? "" : "hide"} py-5`}>
          <h2 className="mt-5 my-2">Dashboard</h2>
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
          <div className="sidebar-footer mt-3 p-3">
            <p>© 2023 Your Company</p>
          </div>
        </div>
      </div>
    </>
  );
}
