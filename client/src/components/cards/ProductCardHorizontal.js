import moment from "moment";
import { useCart } from "../../context/cart";

export default function ProductCardHorizontal({ index, p }) {
  // context
  const [cart, setCart] = useCart();

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

  return (
    <div className="card mb-3">
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
                {p?.price?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
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
  );
}
