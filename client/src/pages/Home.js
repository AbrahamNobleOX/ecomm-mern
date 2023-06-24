import { useEffect, useState } from "react";
import Menu from "../components/nav/Menu";
import Jumbotron from "../components/cards/Jumbotron";
import Cards from "../components/cards/Cards";
import axios from "axios";
import moment from "moment";

export default function Home() {
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

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <Jumbotron title="Hello Customers..." />

        <div className="container text-center mb-5">
          <div className="row">
            <h2 className="mb-3">New Arrivals</h2>
            {products?.map((p) => (
              <div className="col-sm-4 mb-3 mb-sm-4" key={p._id}>
                <div className="card">
                  <img src="" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text">{p.name}</p>
                    <p className="card-text">{moment(p.createdAt).fromNow()}</p>
                    <p className="card-text">{p.sold} sold</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center mb-5">
          <div className="row">
            <h2 className="mb-3">Best Sellers</h2>
            {sortedBySold?.map((p) => (
              <div className="col-sm-4 mb-3 mb-sm-4" key={p._id}>
                <div className="card">
                  <img src="" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text">{p.name}</p>
                    <p className="card-text">{moment(p.createdAt).fromNow()}</p>
                    <p className="card-text">{p.sold} sold</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
