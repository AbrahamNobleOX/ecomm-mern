import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import moment from "moment";
import Menu from "../components/nav/Menu";

export default function Cart() {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  // hooks
  const navigate = useNavigate();

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <h2 className="mb-2 text-center">Shopping Cart</h2>
          <div className="mb-2 text-center">
            {cart?.length > 1
              ? `You have ${cart.length} items in the cart. ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your cart is empty"}
          </div>
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length > 1 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div key={p._id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      className="img-fluid rounded-start p-1"
                      src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                      alt={p.name}
                      style={{
                        height: "130px",
                        width: "130px",
                        objectFit: "cover",
                        borderRadius: "10%",
                      }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{`${p?.description?.substring(
                        0,
                        50
                      )}..`}</p>
                      <p className="card-text text-end">
                        <small className="text-muted">
                          Listed {moment(p.createdAt).fromNow()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">Total / Address / Payments</div>
        </div>

        {/* {categories?.map((c) => (
            <div className="col-md-3" key={c._id}>
              <Link
                className="btn btn-light col-12 p-3 mb-3 text-dark non-text-decoration"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </div>
          ))} */}
        {/* <h5>Cart page {cart.length}</h5> */}
      </div>
    </>
  );
}
