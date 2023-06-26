import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/nav/Menu";
import ProductCard from "../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      loadProducts();
      getTotal();
    }
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      loadFilteredProducts();
    }
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      setProducts([]);
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      console.log("filtered products => ", data);
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
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // This function is a handler for checkbox state changes in a user interface.
  // It takes two parameters: `value` represents the new state of the checkbox (true for checked, false for unchecked),
  // and `id` represents the identifier associated with the checkbox.

  const handleCheck = (value, id) => {
    // Output the `value` and `id` to the console for debugging or logging purposes.
    console.log(value, id);

    // Create a shallow copy of the `checked` array using the spread operator (`[...checked]`).
    // This is done to avoid modifying the original `checked` array directly.
    let all = [...checked];

    // If `value` is true (checkbox is checked), add the `id` to the `all` array.
    if (value) {
      all.push(id);
    } else {
      // If `value` is false (checkbox is unchecked), filter out the `id` from the `all` array.
      // This removes the `id` from the `all` array, ensuring it doesn't remain in the array when unchecked.
      all = all.filter((c) => c !== id);
    }

    // Update the state of `checked` with the modified `all` array using the `setChecked` function.
    setChecked(all);
  };

  const resetFilters = () => {
    setChecked([]); // Reset the checked state to an empty array
    setRadio([]); // Reset the radio state to an empty array
    setTotal(0);
    setPage(1);
    setLoading(false);
    // setProducts([]);
    loadProducts();
    getTotal();
  };

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

      {/* <pre>{JSON.stringify({ checked, radio }, null, 4)}</pre> */}
      <div className="container main-content mb-5">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mb-2 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row p-5">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  checked={checked.includes(c._id)}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row p-5">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
                {prices?.map((p) => (
                  <div key={p._id} style={{ marginLeft: "8px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              {/* <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
              >
                Reset
              </button> */}

              <button
                className="btn btn-outline-primary col-12"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>

          <div
            className="col-md-9"
            style={{ height: "100vh", overflow: "scroll" }}
          >
            <h2 className="p-3 mb-5 h4 bg-light text-center">
              {products?.length} Products
            </h2>

            <div className="row">
              {products?.map((p) => (
                <div key={p._id} className="col-md-4 mb-4">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>

            <div className="container text-center p-5">
              {products &&
                products.length < total &&
                checked.length === 0 &&
                radio.length === 0 && (
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
        </div>
      </div>
    </>
  );
}
