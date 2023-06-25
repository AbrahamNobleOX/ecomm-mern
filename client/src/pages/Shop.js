import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/nav/Menu";
import ProductCard from "../components/cards/ProductCard";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCatgories();
  }, []);

  const loadCatgories = async () => {
    try {
      const { data } = await axios.get("/catgories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <div className="col-md-3">sidebar</div>

          <div className="col-md-9">
            <h2 className="p-3 mb-5 h4 bg-light text-center">
              {products?.length} Products
            </h2>

            <div className="row">
              {products?.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
