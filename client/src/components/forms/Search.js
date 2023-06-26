import axios from "axios";
import { useSearch } from "../../context/search";

export default function Search() {
  // Retrieve the current search context values and update function using the useSearch hook
  const [values, setValues] = useSearch();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send an HTTP GET request to the server to search for products based on the keyword
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);

      // Update the search context state with the received search results
      setValues({ ...values, results: data });
    } catch (err) {
      console.log(err); // Log any errors that occur during the request
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Searc"
          aria-describedby="basic-addon1"
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          value={values.keyword}
        />
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-search" />{" "}
          <button
            className="btn btn-outline-primary"
            type="submit"
            style={{ borderRadius: "0px" }}
          >
            Search {values.results.length}
          </button>
        </span>
      </div>
    </form>
  );
}
