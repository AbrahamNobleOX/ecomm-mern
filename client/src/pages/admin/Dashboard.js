import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  selectData,
  selectStatus,
} from "../../redux/reducers/csvData";
import axios from "axios";

export default function AdminDashboard() {
  // context
  const [auth, setAuth] = useAuth();
  const [loadingStatus, setLoadingStatus] = useState("");

  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const { loading, success, error } = useSelector(selectStatus);

  const fetchData = async () => {
    try {
      dispatch(fetchDataStart());

      // Perform API fetch here
      const { data } = await axios.get("/categories");

      // Dispatch the action to update Redux store with the fetched data
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      // Handle error
      dispatch(fetchDataFailure(error.message));
      console.log("Error:", error);
    }
  };

  const fetchDatai = async () => {
    try {
      dispatch(fetchDataStart());

      // Perform API fetch here
      const { data } = await axios.get(
        "categories?page=1&per_page=2&sort=name&order=desc&keyword=aardvark-hire-limited"
      );

      // Dispatch the action to update Redux store with the fetched data
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      // Handle error
      dispatch(fetchDataFailure(error.message));
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container-fluid main-content">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the Admin Dashboard</h1>

              <div>{auth?.user?.name}</div>
              <div>{auth?.user?.email}</div>
              <div>Admin</div>

              <p>This is the main content area.</p>
              <div>
                <div>
                  <button className="me-3" onClick={fetchData}>
                    Fetch Data
                  </button>
                  <button className="" onClick={fetchDatai}>
                    Fetch Datai
                  </button>

                  {loading && !data ? (
                    <div>Loading...</div>
                  ) : success && data.length > 0 ? (
                    <ul>
                      {data.map((item) => (
                        <li key={item._id}>{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>No data available.</div>
                  )}
                  {error && <div>Error: {error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
