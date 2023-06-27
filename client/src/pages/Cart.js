import { useCart } from "../context/cart";
import Menu from "../components/nav/Menu";

export default function Cart() {
  // context
  const [cart, setCart] = useCart();

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <h2 className="mb-4 text-center">Shopping Cart</h2>
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
          <h5>Cart page {cart.length}</h5>
        </div>
      </div>
    </>
  );
}
