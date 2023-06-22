import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  const [totalCount, setTotalCount] = useState(0); // Total number of items
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction
  const [sortBy, setSortBy] = useState("name"); // Column to sort by

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating");
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
        toast.dismiss(toastId);
      }
    } catch (err) {
      if (err.message === "Network Error") {
        // Display a specific error message when the network is disabled
        toast.error(
          "Network connection error. Please check your internet connection."
        );
        toast.dismiss(toastId);
      } else {
        // Display a generic error message for other types of errors
        console.log(err.message);
        toast.error("Create category failed. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, [sortBy, sortDirection]);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); // Sort the data by name in ascending order
      setCategories(sortedData);
      setTotalCount(sortedData.length); // Set the total count of items
      sortData(data, sortBy, sortDirection);
    } catch (err) {
      console.log(err);
    }
  };

  // Sort the data based on the column and direction
  const sortData = (data, column, direction) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setCategories(sortedData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating");
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
        toast.dismiss(toastId);
      }
    } catch (err) {
      if (err.message === "Network Error") {
        // Display a specific error message when the network is disabled
        toast.error(
          "Network connection error. Please check your internet connection."
        );
        toast.dismiss(toastId);
      } else {
        // Display a generic error message for other types of errors
        console.log(err.message);
        toast.error("Category may already exist. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Deleting");
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        loadCategories();
        setVisible(false);
        toast.dismiss(toastId);
      }
    } catch (err) {
      if (err.message === "Network Error") {
        // Display a specific error message when the network is disabled
        toast.error(
          "Network connection error. Please check your internet connection."
        );
        toast.dismiss(toastId);
      } else {
        // Display a generic error message for other types of errors
        console.log(err.message);
        toast.error("Category may already exist. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = categories
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) // Filter items based on the search term
    .slice(indexOfFirstItem, indexOfLastItem);

  // Go to the first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to the last page
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(categories.length / itemsPerPage));
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Go to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset the current page when search term changes
  };

  // Handle column header click for sorting
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />

          <div className="container col-md-12 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1 className="mb-5">Welcome to the Admin Category</h1>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
              {/* <hr className="my-2 mx-0" /> */}
            </div>
          </div>

          <div className="container col-md-6 px-5">
            <div className="content">
              <div>
                {categories.length > 0 ? (
                  <>
                    <div className="row g-3 d-flex justify-content-end">
                      <div className="col-auto">
                        <label htmlFor="search" className="col-form-label">
                          Search:
                        </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="text"
                          id="search"
                          placeholder="Type Here..."
                          className="form-control"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>

                    <table className="table">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th
                            onClick={() => handleSort("name")}
                            style={{ cursor: "pointer" }}
                          >
                            NAME
                            <i class="bi bi-chevron-expand smaller-icon px-1"></i>
                          </th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems?.map((c, index) => (
                          <tr key={c._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{c.name}</td>
                            <td>
                              <button
                                key={c._id}
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                  setVisible(true);
                                  setSelected(c);
                                  setUpdatingName(c.name);
                                }}
                              >
                                <i class="bi bi-info-circle-fill"></i> Info
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p>Total Items: {totalCount}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}

                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link btn btn-outline-primary btn-sm m-1"
                        onClick={goToFirstPage}
                      >
                        <i class="bi bi-chevron-bar-left"></i>
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link btn btn-outline-primary btn-sm m-1"
                        onClick={goToPreviousPage}
                      >
                        <i class="bi bi-arrow-left-short"></i>
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(categories.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link btn btn-outline-primary btn-sm m-1"
                        onClick={goToNextPage}
                      >
                        <i class="bi bi-arrow-right-short"></i>
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(categories.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link btn btn-outline-primary btn-sm m-1"
                        onClick={goToLastPage}
                      >
                        <i class="bi bi-chevron-bar-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              <Modal
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <CategoryForm
                  value={updatingName}
                  setValue={setUpdatingName}
                  handleSubmit={handleUpdate}
                  buttonText="Update"
                  handleDelete={handleDelete}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
