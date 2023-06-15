import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/auth";

export default function AdminDashboard() {
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

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <div className={`sidebar ${isSidebarOpen ? "" : "hide"}`}>
              <h2>Dashboard</h2>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
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
                  <NavLink className="nav-link" to="/dashboard/admin/products">
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
                          Password <span className="badge bg-primary">5</span>
                        </a>
                      </li>
                      <hr className="my-1" />
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Logout <span className="badge bg-success">3</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-10">
            <div className="content">
              <h1>Welcome to the Dashboard</h1>
              <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              </button>
              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
