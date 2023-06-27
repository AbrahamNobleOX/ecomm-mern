import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";

export default function ProductCard({ p }) {
  // context
  const [cart, setCart] = useCart();

  // hooks
  const navigate = useNavigate();

  return (
    <>
      <div className="card h-100 hoverable">
        <Badge.Ribbon text={`${p?.sold} sold`} color="red">
          <Badge.Ribbon
            text={`${
              p?.quantity >= 1
                ? `${p?.quantity - p?.sold} in stock`
                : "Out of stock"
            }`}
            placement="start"
            color="green"
          >
            <img
              className="card-img-top"
              src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
              alt={p.name}
              style={{ height: "300px", objectFit: "cover" }}
            />
          </Badge.Ribbon>
        </Badge.Ribbon>
        <div className="card-body">
          <h5>{p?.name}</h5>
          <h4 className="fw-bold">
            {p?.price?.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </h4>
          <p className="card-text">{p?.description?.substring(0, 60)}...</p>

          {/* <p className="card-text">{moment(p.createdAt).fromNow()}</p>
            <p className="card-text">{p.sold} sold</p> */}
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary col card-button"
            style={{ borderBottomLeftRadius: "5px" }}
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            View Product
          </button>

          <button
            className="btn btn-outline-primary col card-button"
            style={{ borderBottomRightRadius: "5px" }}
            onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem("cart", JSON.stringify([...cart, p]));
              toast.success("Added to Cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
