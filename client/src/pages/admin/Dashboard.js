import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminDashboard() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container-fluid main-content">
        <div className="row">
          <AdminMenu />

          <div className="col-md-10 mt-5 py-5">
            <div className="content">
              <h1>Welcome to the Dashboard</h1>

              <div>{auth?.user?.name}</div>
              <div>{auth?.user?.email}</div>
              <div>Admin</div>

              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
