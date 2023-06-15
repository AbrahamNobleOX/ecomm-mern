import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <div className="col-md-2 p-0">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <div className="content">
              <h1>Welcome to the Products</h1>
              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
