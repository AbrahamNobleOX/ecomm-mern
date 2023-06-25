import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useLogout } from "../utils/Logout";

export default function Menu() {
  // custom hook
  const [auth, setAuth] = useAuth();

  // Logout hook
  const handleLogout = useLogout();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 shadow-lg p-3 rounded">
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
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <i className="bi bi-house-door"></i> HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/shop">
                  <i className="bi bi-house-door"></i> SHOP
                </NavLink>
              </li>
              {!auth?.user ? (
                // Render login and register links if auth.user null
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <i className="bi bi-box-arrow-in-right" /> LOGIN
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard/secret">
                      <i className="bi bi-link"></i> SECRET
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <i className="bi bi-person-plus"></i> REGISTER
                    </NavLink>
                  </li>
                </>
              ) : (
                // Else, Render logout link if user is authenticated
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-person-circle px-1" />
                        {auth?.user?.name}
                      </button>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <NavLink
                            className="d-flex nav-link p-0 justify-content-end"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin/" : "user/"
                            }`}
                          >
                            <i className="bi bi-speedometer2 px-1" />
                            DASHBOARD
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li className="dropdown-item d-flex justify-content-end">
                          <button
                            className="nav-link p-0 cursor-pointer"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-box-arrow-right px-1" />
                            LOGOUT
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </ul>
            <form className="d-flex" role="search">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Searc"
                  aria-describedby="basic-addon1"
                />
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search" />
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* <nav className="navbar fixed-bottom bg-body-tertiary shadow-lg">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img
              src="https://getbootstrap.com//docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top"
            />
            Ecommerce
          </Link>
        </div>
      </nav> */}
    </>
  );
}
