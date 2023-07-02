import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

export default function UserCartSidebar() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

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

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      //   console.log("nonce => ", nonce);

      // let total = 0;
      // cart.map((item) => {
      //   total += item.price;
      // });

      const calculateTotal = cart.map((item) => item.price);
      const total = await Promise.all(calculateTotal);

      const { data } = await axios.post("/braintree/payment", {
        nonce,
        total: total.reduce((acc, price) => acc + price, 0),
      });
      //   console.log("handle buy response => ", data);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successful");
    } catch (err) {
      console.log(err);
    }
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
      <div className="mt-3">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance}
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
