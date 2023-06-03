import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  // custom hook
  const [auth, setAuth] = useAuth();
  // hook
  const navigate = useNavigate();

  // Function to handle user logout
  const logout = () => {
    // Clear authentication state
    setAuth({ ...auth, user: null, token: "" });

    // Remove authentication data from local storage
    localStorage.removeItem("auth");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg p-3 mb-5 rounded">
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
                  HOME
                </NavLink>
              </li>
              {!auth?.user ? (
                // Render login and register links if auth.user null
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      REGISTER
                    </NavLink>
                  </li>
                </>
              ) : (
                // Else, Render logout link if user is authenticated
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                      DASHBOARD
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link cursor-pointer"
                      onClick={logout}
                    >
                      LOGOUT
                    </button>
                  </li>
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
