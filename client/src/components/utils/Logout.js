import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

// Function to handle user logout
export const useLogout = () => {
  // custom hook
  const [auth, setAuth] = useAuth();
  // hook
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    setAuth({ ...auth, user: null, token: "" });

    // Remove authentication data from local storage
    localStorage.removeItem("auth");

    // Redirect to the login page
    navigate("/login");
  };

  return handleLogout;
};
