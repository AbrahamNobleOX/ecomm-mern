import { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  // Retrieve the current search context values and update function using the useSearch hook
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  // Handle form submission
  const searchProducts = async (e) => {
    try {
      // Send an HTTP GET request to the server to search for products based on the keyword
      if (values?.keyword) {
        const { data } = await axios.get(`/products/search/${values?.keyword}`);
        // console.log(data);

        // Update the search context state with the received search results
        // The values object is spread (...values) to retain the existing values
        setValues({ ...values, results: data });
      } else {
        return;
      }
    } catch (err) {
      console.log(err.message); // Log any errors that occur during the request
    }
  };

  // Use the useEffect hook to trigger the search when the keyword changes
  useEffect(() => {
    searchProducts();
  }, [values.keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    searchProducts();
    navigate("/search"); // Trigger the search when the form is submitted
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });
    if (keyword.trim() === "") {
      const initialSearchState = {
        keyword: "",
        results: [],
      };
      setValues(initialSearchState);
      // navigate("/shop");
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={handleInputChange}
          value={values.keyword}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="button-addon2"
        >
          <i className="bi bi-search mx-1" />
        </button>
      </div>
      {values.results.length > 0 && (
        <div className="dropdown-menu mt-5" style={{ display: "block" }}>
          {values.results.map((p) => (
            <a
              key={p._id}
              href={`/products/${p._id}`}
              className="dropdown-item"
            >
              <i className="bi bi-film px-2"></i>
              {p.name}
            </a>
          ))}
        </div>
      )}
    </form>
  );
}
