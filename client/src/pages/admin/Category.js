import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import DataTable from "react-data-table-component";

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

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
      sortable: true,
      sortField: "id",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      sortField: "slug",
    },
  ];

  const fetchUsers = async (page) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/categories?page=${page}&per_page=${perPage}&sort=${sortField}&order=${sortDirectionSt}&delay=1`
      );

      setData(data.data);
      setTotalRows(data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/categories?page=${page}&per_page=${newPerPage}&sort=${sortField}&order=${sortDirectionSt}&delay=1`
      );

      setData(data.data);
      setPerPage(newPerPage);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // handleSort("_id", "asc");
  }, []);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  const handleSort = async (column, sortDirection) => {
    try {
      /// reach out to some API and get new data using or sortField and sortDirection
      console.log(column, sortDirection);
      setLoading(true);
      const { data } = await axios.get(
        `/categories?sort=${column.sortField}&order=${sortDirection}&delay=1`
      );

      setData(data.data);
      setSortField(column.sortField);
      setSortDirection(sortDirection);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
            </div>
          </div>

          <div className="container col-md-6 px-5">
            <div className="content">
              <DataTable
                title="Categories"
                columns={columns}
                data={data}
                progressPending={loading}
                selectableRows
                onSelectedRowsChange={handleChange}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSort={handleSort}
                sortServer
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
