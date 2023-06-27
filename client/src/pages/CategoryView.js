import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/nav/Menu";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
  // state
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      loadProductsByCatgory();
    }
  }, [params?.slug]);

  const loadProductsByCatgory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-center">
                {products?.length < 1
                  ? `No products found in the "${category?.name}" category`
                  : `Found ${products?.length} products in the "${category?.name}" category`}
              </h2>
            </div>
            <div className="row">
              {products?.map((p) => (
                <div key={p._id} className="col-md-3 mb-4">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
