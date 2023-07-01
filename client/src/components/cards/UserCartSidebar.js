import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

export default function UserCartSidebar() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();

  const cartTotal = () => {
    // Initialize a variable named 'total' with a value of 0
    let total = 0;

    // Iterate over each item in the 'cart' array using the 'map' method
    cart.map((item) => {
      // Add the price of the current item to the 'total' variable
      total += item.price;
    });

    // Return the 'total' value as a formatted string using 'toLocaleString'
    return total.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  return (
    <div className="col-md-6">
      <h5>Cart Summary</h5>
      Total / Address / Payments
      <hr />
      <h6 className="text-end">Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h5>Address:</h5>
            <span>{auth?.user?.address}</span>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          </div>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Add Delivery Address
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-danger mt-3"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Login to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
