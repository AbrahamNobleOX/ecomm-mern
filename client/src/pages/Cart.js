import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Menu from "../components/nav/Menu";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

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
                <ProductCardHorizontal key={index} index={index} p={p} />
              ))}
            </div>

            <UserCartSidebar />
          </div>
        )}
      </div>
    </>
  );
}
