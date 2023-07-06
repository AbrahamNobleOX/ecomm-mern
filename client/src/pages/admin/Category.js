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
  const [perPage, setPerPage] = useState(5);

  const columns = [
    {
      name: "Title",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
  ];

  const fetchUsers = async (page) => {
    setLoading(true);

    const { data } = await axios.get(
      `/categories?page=${page}&per_page=${perPage}&delay=1`
    );

    setData(data.data);
    setTotalRows(data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const { data } = await axios.get(
      `/categories?page=${page}&per_page=${newPerPage}&delay=1`
    );

    setData(data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);

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
                title="Users"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
