import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useLogout } from "../utils/Logout";
import { useCart } from "../../context/cart";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // hooks
  const handleLogout = useLogout();
  const categories = useCategory();

  // console.log("categories in menu => ", categories);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 shadow-lg p-3 rounded sticky-top">
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
                <NavLink className="nav-link" to="/">
                  <i className="bi bi-house-door"></i> HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">
                  <i className="bi bi-shop"></i> SHOP
                </NavLink>
              </li>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-tags px-1" />
                    CATEGORIES
                  </button>
                  <ul
                    className="dropdown-menu"
                    // style={{ height: "300px", overflow: "scroll" }}
                  >
                    <li className="dropdown-item">
                      <NavLink
                        className="d-flex nav-link p-0 justify-content-end"
                        to="/categories"
                      >
                        All Categories
                      </NavLink>
                    </li>
                    {categories?.map((c) => (
                      <li className="dropdown-item" key={c._id}>
                        <NavLink
                          className="d-flex nav-link p-0 justify-content-end"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
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
                        {auth?.user?.name.toUpperCase()}
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
              <li className="nav-item">
                {/* <Badge
                  count={cart?.length >= 1 ? cart.length : 0}
                  offset={[-5, 11]}
                  showZero={true}
                >
                  <NavLink className="nav-link" to="/cart">
                    CART
                  </NavLink>
                </Badge> */}
                <NavLink className="nav-link position-relative" to="/cart">
                  <i class="bi bi-cart4 px-1"></i>CART
                  <span className="badge bg-danger position-absolute top-0">
                    {cart?.length >= 1 ? cart.length : 0}
                  </span>
                </NavLink>
              </li>
            </ul>

            <Search />
          </div>
        </div>
      </nav>
    </>
  );
}
