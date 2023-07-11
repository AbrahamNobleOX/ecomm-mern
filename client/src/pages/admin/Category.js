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
import { capitalCase } from "change-case";
import Papa from "papaparse";
import { faker } from "@faker-js/faker";
import { read, utils, writeFile } from "xlsx";

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    // email: faker.internet.email(),
    // avatar: faker.image.avatar(),
    // password: faker.internet.password(),
    // birthdate: faker.date.birthdate().toString(),
    // registeredAt: faker.date.past().toString(),
  };
}

const users = Array.from({ length: 3 }, createRandomUser);

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
  const [parsedcsvData, setParsedCSVData] = useState([]);

  /* the component state is an array of objects */
  const [pres, setPres] = useState([]);
  const [batchSizeValue, setBatchSizeValue] = useState(1000);

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
    const capitalizedHeader = headers.map((header) => capitalCase(header));

    // Map the JSON data to an array of arrays
    const data = csvData.map((item) => Object.values(item));

    // Set the table column widths to 10
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedCSVData(results.data);
        handleParsingComplete(results); // Process the parsed CSV data
      },
    });
  };

  const handleFileUploadXLSX = async (event) => {
    try {
      const file = event.target.files[0];
      const data = await file.arrayBuffer();

      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = utils.sheet_to_json(worksheet);
      setPres(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFileUploadXLSX = async (event) => {
  //   try {
  //     const file = event.target.files[0];
  //     const data = await file.arrayBuffer();

  //     const workbook = await read(data, { type: "array" });
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  //     const chunkSize = 500;
  //     const range = worksheet["!ref"];
  //     if (!range) {
  //       throw new Error("Worksheet range is undefined.");
  //     }
  //     const { s, e } = utils.decode_range(range);

  //     const parsedData = [];
  //     let startRow = s.r;
  //     while (startRow <= e.r) {
  //       const endRow = Math.min(startRow + chunkSize - 1, e.r);
  //       const rangeChunk = `${utils.encode_col(s.c)}${
  //         startRow + 1
  //       }:${utils.encode_col(e.c)}${endRow + 1}`;
  //       const chunk = utils.sheet_to_json(worksheet, { range: rangeChunk });
  //       parsedData.push(...chunk);

  //       startRow += chunkSize;
  //     }

  //     console.log("Parsing complete. Total rows:", e.r - s.r + 1);

  //     // Batched state update
  //     let batchIndex = 0;
  //     const batchSize = Math.min(batchSizeValue, parsedData.length);

  //     const updateBatch = () => {
  //       setPres((prevPres) => [
  //         ...prevPres,
  //         ...parsedData.slice(batchIndex, batchIndex + batchSize),
  //       ]);
  //       batchIndex += batchSize;

  //       if (batchIndex < parsedData.length) {
  //         setTimeout(updateBatch, 0); // Batched update using setTimeout
  //       }
  //     };

  //     if (parsedData.length > 0) {
  //       setTimeout(updateBatch, 0); // Start batched update
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleParsingComplete = async (results) => {
    const parsedData = results.data;

    try {
      // Send the parsed data to the server using Axios
      await axios.post("/uploadcsv", parsedData);
    } catch (error) {
      console.error("Error uploading data to the server:", error);
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

          <div className="container col-md-9 px-5">
            <div className="content">
              <div className="mb-5">
                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleFileUploadXLSX}
                />
                <ul>
                  {pres.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-5">
                {users.map((user) => (
                  <div key={user.userId}>
                    <p>Username: {user.username}</p>
                    {/* <p>Email: {user.email}</p>
                    <img src={user.avatar} alt="Avatar" />
                    <p>Password: {user.password}</p>
                    <p>Birthdate: {user.birthdate}</p>
                    <p>Registered At: {user.registeredAt}</p> */}
                  </div>
                ))}
              </div>
              <div className="mb-5">
                {parsedcsvData.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(parsedcsvData[0]).map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedcsvData.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((cell, index) => (
                            <td key={index}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="mb-5">
                <input type="file" accept=".csv" onChange={handleFileUpload} />
              </div>
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
