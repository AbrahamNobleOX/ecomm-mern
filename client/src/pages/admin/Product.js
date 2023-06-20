import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the Admin Products</h1>
              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
