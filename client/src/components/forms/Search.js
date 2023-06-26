import { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/search";

export default function Search() {
  // Retrieve the current search context values and update function using the useSearch hook
  const [values, setValues] = useSearch();

  // Handle form submission
  const searchProducts = async (e) => {
    try {
      // Send an HTTP GET request to the server to search for products based on the keyword
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);

      // Update the search context state with the received search results
      // The values object is spread (...values) to retain the existing values
      setValues({ ...values, results: data });
    } catch (err) {
      console.log(err); // Log any errors that occur during the request
    }
  };

  // Use the useEffect hook to trigger the search when the keyword changes
  useEffect(() => {
    searchProducts();
  }, [values.keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    searchProducts(); // Trigger the search when the form is submitted
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
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          value={values.keyword}
        />
        <button
          class="btn btn-outline-primary"
          type="submit"
          id="button-addon2"
        >
          <i className="bi bi-search mx-1" />
          {values.results.length}
        </button>
      </div>
    </form>
  );
}
