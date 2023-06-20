import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";

export default function Dashboard() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container-fluid main-content">
        <div className="row">
          <UserMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the User Dashboard</h1>

              <div>{auth?.user?.name}</div>
              <div>{auth?.user?.email}</div>

              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
