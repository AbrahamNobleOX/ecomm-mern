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

  const removeFromCart = (productId, productIndex) => {
    let myCart = [...cart]; // Create a new copy of the cart array using the spread operator
    let index = myCart.findIndex(
      (item, index) => item._id === productId && index === productIndex
    ); // Find the index of the item with the given productId in the cart

    // console.log(index);
    myCart.splice(index, 1); // Remove the item from the cart array using the splice method
    setCart(myCart); // Update the cart state with the modified cart array
    localStorage.setItem("cart", JSON.stringify(myCart)); // Update the cart data stored in localStorage
  };

  const cartTotal = () => {
    // Initialize a variable named 'total' with a value of 0
    let total = 0;

    // Iterate over each item in the 'cart' array using the 'map' method
    cart.map((item) => {
      // Add the price of the current item to the 'total' variable
      total += item.price;
    });

    // Return the 'total' value as a formatted string using 'toLocaleString'
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <h2 className="mb-2 text-center">Shopping Cart</h2>
          <div className="mb-2 text-center">
            {cart?.length > 0
              ? `You have ${cart.length} items in the cart. ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your cart is empty"}
          </div>
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length > 0 ? (
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
        {cart?.length > 0 && (
          <div className="row">
            <div className="col-md-6">
              {cart?.map((p, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        className="img-fluid rounded-start p-1 pt-2"
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
                        <div className="d-flex justify-content-between">
                          <div className="card-title h5">{p.name}</div>
                          <div className="text-end">
                            {p?.price?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </div>
                        </div>
                        <p className="card-text">{`${p?.description?.substring(
                          0,
                          50
                        )}..`}</p>
                        <div className="d-flex justify-content-between">
                          <div className="card-text text-end">
                            <small className="text-muted">
                              Listed {moment(p.createdAt).fromNow()}
                            </small>
                          </div>
                          <div
                            className="text-danger mb-2 pointer"
                            onClick={() => removeFromCart(p._id, index)}
                          >
                            <i className="bi bi-x-octagon px-1" />
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <h5>Your Cart Summary</h5>
              Total / Address / Payments
              <hr />
              <h6>Total: {cartTotal()}</h6>
            </div>
          </div>
        )}

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
