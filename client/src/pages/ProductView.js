import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import Menu from "../components/nav/Menu";

export default function ProductView() {
  // state
  const [product, setProduct] = useState({});
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
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <div className="col-md-9">
            <div className="card mb-3 hoverable">
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
                <h5>{product?.name}</h5>

                <h4 className="fw-bold">
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>

                <p className="card-text">{product?.description}</p>
              </div>

              <button
                className="btn btn-outline-primary col card-button"
                style={{ borderBottomRightRadius: "5px" }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <h2>Related Products</h2>
          </div>
        </div>
      </div>
    </>
  );
}
