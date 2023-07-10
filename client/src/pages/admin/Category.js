import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "../../components/utils/Pdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const [csvData, setcsvData] = useState([]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
      sortable: true,
      keyword: "id",
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
        `/categories?page=${page}&per_page=${perPage}&sort=${sortField}&order=${sortDirectionSt}&keyword=${search}&delay=1`
      );

      setData(data.data);
      setTotalRows(data.total);
      setcsvData(data.csvData);
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
        `/categories?page=${page}&per_page=${newPerPage}&sort=${sortField}&order=${sortDirectionSt}&keyword=${search}&delay=1`
      );

      setData(data.data);
      setPerPage(newPerPage);
      setcsvData(data.csvData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
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
        `/categories?sort=${column.sortField}&order=${sortDirection}&keyword=${search}&delay=1`
      );

      setData(data.data);
      setSortField(column.sortField);
      setSortDirection(sortDirection);
      setcsvData(data.csvData);
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
          `/categories?sort=${sortField}&order=${sortDirectionSt}&keyword=${search}&delay=1`
        );
        // console.log(data);

        // Update the search context state with the received search results
        // The values object is spread (...values) to retain the existing values
        setData(data.data);
        setTotalRows(data.total);
        setcsvData(data.csvData);
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
          `/categories?sort=${sortField}&order=${sortDirectionSt}&delay=1`
        );

        setData(data.data);
        setTotalRows(data.total);
        setcsvData(data.csvData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Set the table headers based on the keys in the first object
    const headers = Object.keys(csvData[0]);

    // Capitalize each word inside headers
    const capitalizedHeader = headers.map((header) =>
      header.replace(/\b\w/g, (match) => match.toUpperCase())
    );

    // Map the JSON data to an array of arrays
    const data = csvData.map((item) => Object.values(item));

    // Set the table column widths
    const columnWidths = headers.map(() => 10);

    // Set the table position (left margin: 10, top margin: 10)
    const position = { x: 10, y: 10 };

    autoTable(doc, {
      columnStyles: { name: { halign: "center" } },
      body: data,
      head: [capitalizedHeader],
      columns: columnWidths,
      // columns: [
      //   { header: "Name", dataKey: "name" },
      //   { header: "Slug", dataKey: "slug" },
      // ],
      startY: position.y,
    });

    doc.save("mypdf.pdf");
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
              <div className="d-flex justify-content-end">
                <CSVLink
                  className="btn btn-outline-primary btn-sm mx-2"
                  data={csvData}
                >
                  Export CSV
                </CSVLink>
                <PDFDownloadLink
                  document={<Pdf data={csvData} />}
                  fileName="FORM"
                >
                  {({ loading }) =>
                    loading ? (
                      <button className="btn btn-outline-primary btn-sm">
                        Loading...
                      </button>
                    ) : (
                      <button className="btn btn-outline-primary btn-sm">
                        Export PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>
                <button
                  className="btn btn-outline-primary btn-sm mx-2"
                  onClick={exportPdf}
                >
                  Export jsPDF
                </button>
              </div>

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
                subHeader
                subHeaderComponent={
                  <form
                    className="d-flex justify-content-between"
                    role="search"
                  >
                    <div className="input-group mb-3">
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
                  </form>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
