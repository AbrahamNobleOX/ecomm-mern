import { useAuth } from "../../context/auth";
import UserMenu from "../../components/nav/UserMenu";

export default function UserProfile() {
  // context
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <UserMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the User Profile</h1>
              <p>This is the main content area.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
