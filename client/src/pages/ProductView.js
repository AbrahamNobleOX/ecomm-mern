import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import Menu from "../components/nav/Menu";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import { useCart } from "../context/cart";

export default function ProductView() {
  // state
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  // context
  const [cart, setCart] = useCart();

  // hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      loadProduct();
    }
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-9">
            <div className="card mb-5">
              <Badge.Ribbon text={`${product?.sold} sold`} color="red">
                <Badge.Ribbon
                  text={`${
                    product?.quantity >= 1
                      ? `${product?.quantity - product?.sold} in stock`
                      : "Out of stock"
                  }`}
                  placement="start"
                  color="green"
                >
                  <img
                    className="card-img-top"
                    src={
                      product._id
                        ? `${process.env.REACT_APP_API}/product/photo/${product._id}`
                        : undefined
                    }
                    alt={product.name}
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Badge.Ribbon>
              </Badge.Ribbon>

              <div className="card-body">
                <h1 className="fw-bold">{product?.name}</h1>
                <p className="card-text lead">{product?.description}</p>
              </div>

              <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
                <div>
                  <p>
                    <FaDollarSign /> Price:
                    {product?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>

                  <p>
                    <FaProjectDiagram /> Category: {product?.category?.name}
                  </p>

                  <p>
                    <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                  </p>

                  <p>
                    {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}
                    {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </p>

                  <p>
                    <FaWarehouse /> Available
                    {product?.quantity - product?.sold}
                  </p>

                  <p>
                    <FaRocket /> Sold {product.sold}
                  </p>
                </div>
              </div>

              <button
                className="btn btn-outline-primary col card-button"
                style={{ borderBottomRightRadius: "5px" }}
                onClick={() => {
                  // Create a new cart array without the "photo" property for each item
                  const cartWithoutPhoto = cart.map((item) => ({
                    ...item,
                    photo: undefined, // or null, depending on your preference
                  }));

                  // Create a new object without the "photo" property
                  const cartItemWithoutPhoto = {
                    ...product,
                    photo: undefined, // or null, depending on your preference
                  };

                  setCart([...cartWithoutPhoto, cartItemWithoutPhoto]);

                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cartWithoutPhoto, cartItemWithoutPhoto])
                  );
                  toast.success("Added to Cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <h2>Related Products</h2>
            <hr className="mb-4" />
            {related?.length < 1 && <p>Nothing found</p>}
            {related?.map((p) => (
              <div key={p._id} className="mb-4">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
