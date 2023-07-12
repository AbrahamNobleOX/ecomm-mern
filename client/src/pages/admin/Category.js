import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState("name"); // Column to sort by
  const [sortDirectionSt, setSortDirection] = useState("desc"); // Sorting direction
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const sN = (currentPage - 1) * perPage + 1;
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/categories?page=${page}&per_page=${perPage}&sort=${sortField}&order=${sortDirectionSt}&keyword=${search}&delay=1`
      );

      setData(data.data);
      setTotalRows(data.total);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  const handleSort = async (sortField, sortDirection) => {
    try {
      /// reach out to some API and get new data using or sortField and sortDirection
      // Toggle the sort direction
      const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
      console.log(sortField, sortDirection);

      setLoading(true);
      const { data } = await axios.get(
        `/categories?page=1&per_page=${perPage}&sort=${sortField}&order=${newSortDirection}&keyword=${search}&delay=1`
      );

      setData(data.data);
      setSortField(sortField);
      setSortDirection(newSortDirection);
      setTotalRows(data.total);
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Use the useEffect hook to trigger the search when the keyword changes
  useEffect(() => {
    searchCategory();
  }, [search]);

  // Handle form submission
  const searchCategory = async (page) => {
    try {
      setLoading(true);
      console.log(search);
      // Send an HTTP GET request to the server to search for products based on the keyword
      if (search) {
        const { data } = await axios.get(
          `/categories?page=1&per_page=${perPage}&sort=${sortField}&order=${sortDirectionSt}&keyword=${search}&delay=1`
        );
        // console.log(data);

        // Update the search context state with the received search results
        // The values object is spread (...values) to retain the existing values
        setData(data.data);
        setTotalRows(data.total);
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
        setLoading(false);
      } else {
        return;
      }
    } catch (err) {
      console.log(err.message); // Log any errors that occur during the request
    }
  };

  const handleInputChange = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    setSortField("name");
    setSortDirection("desc");

    if (keyword.trim() === "") {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/categories?page=1&per_page=${perPage}&sort=${sortField}&order=${sortDirectionSt}&delay=1`
        );

        setData(data.data);
        setTotalRows(data.total);
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    fetchUsers(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      fetchUsers(previousPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    fetchUsers(totalPages);
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Function to handle logging of selected item IDs
  const logSelectedItems = (e) => {
    e.preventDefault();
    console.log(selectedItems);
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />

          <div className="container col-md-12 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1 className="mb-5">Welcome to the Admin Category</h1>
            </div>
          </div>

          <div className="container col-md-9 px-5">
            <div className="content">
              <div>{selectedItems.length}</div>
              <pre>{JSON.stringify(selectedItems, null, 4)}</pre>
              <form className="d-flex justify-content-between" role="search">
                <div className="input-group mb-3 w-25">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={search}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={logSelectedItems}
                  >
                    Delete
                  </button>
                </div>
              </form>
              {totalPages === 0 ? (
                <div className="d-flex justify-content-center m-5">
                  No results found for this search
                </div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Checkbox</th>
                      <th scope="col">S/N</th>
                      <th scope="col">Id</th>
                      <th
                        scope="col"
                        onClick={() => handleSort(sortField, sortDirectionSt)}
                        style={{ cursor: "pointer" }}
                      >
                        Name
                        {sortDirectionSt === "asc" ? (
                          <i className="bi bi-caret-up-fill smaller-icon px-1"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill smaller-icon px-1"></i>
                        )}
                      </th>
                      <th scope="col">Slug</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          <div>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedItems.includes(item._id)}
                              onChange={() => handleCheckboxChange(item._id)}
                            />
                          </div>
                        </td>
                        <td>{sN + index}</td>
                        <td scope="row">{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="d-flex justify-content-end">
                <div className="p-2">
                  <span className="me-1">
                    {!totalRows == 0
                      ? (currentPage - 1) * perPage + 1
                      : totalRows}
                  </span>
                  -
                  <span className="ms-1">
                    {Math.min(currentPage * perPage, totalRows)}
                  </span>
                  <span className="ms-1">of</span>
                  <span className="ms-1">{totalRows}</span>
                </div>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1 || totalPages === 0}
                >
                  <i className="bi bi-chevron-bar-left"></i>
                </button>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 || totalPages === 0}
                >
                  <i className="bi bi-arrow-left-short"></i>
                </button>
                <button
                  className="btn btn-outline-primary mx-2"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <i className="bi bi-arrow-right-short"></i>
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <i className="bi bi-chevron-bar-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
