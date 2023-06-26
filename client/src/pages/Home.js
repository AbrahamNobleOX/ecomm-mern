import { useEffect, useState } from "react";
import Menu from "../components/nav/Menu";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";

export default function Home() {
  // Define a state variable called 'products' and a function 'setProducts' to update it, initialize it as an empty array
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Run the effect only once when the component is initially rendered
  // Call the 'loadProducts' function to fetch the product data
  // The empty dependency array [] ensures it runs only once
  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  // Define an asynchronous function 'loadProducts' responsible for fetching the product data from an API
  const loadProducts = async () => {
    try {
      // Send an HTTP GET request to the '/products' endpoint using Axios
      // Extract the response data using destructuring assignment ({ data })
      const { data } = await axios.get(`/list-products/${page}`);

      // Update the 'products' state with the fetched data
      setProducts(data);
    } catch (err) {
      // If an error occurs during the API call, log the error to the console
      console.log(err);
    }
  };

  // Create a new array 'arr' by spreading the elements of the 'products' array
  // This step is optional and seems to make a copy of the 'products' array for further sorting without modifying the original array
  const arr = [...products];

  // Sort the 'arr' array based on the 'sold' property of each object
  // The comparison function (a, b) => (a.sold < b.sold ? 1 : -1) sorts in descending order of 'sold' property
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <Jumbotron title="Hello Customers..." />

        <div className="container text-center mb-5">
          <div className="row">
            <h2 className="mb-3">New Arrivals</h2>
            {products?.map((p) => (
              <div key={p._id} className="col-md-3 mb-4">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center mb-5">
          <div className="row">
            <h2 className="mb-3">Best Sellers</h2>
            {sortedBySold?.map((p) => (
              <div key={p._id} className="col-md-3 mb-4">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center p-5">
          {products && products.length < total && (
            <button
              className="btn btn-primary col-md-3"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
