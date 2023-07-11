import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectData,
  selectStatus,
} from "../../redux/reducers/csvData";

export default function AdminDashboard() {
  // context
  const [auth, setAuth] = useAuth();

  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const { loading, success, error } = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
                  {loading ? (
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
