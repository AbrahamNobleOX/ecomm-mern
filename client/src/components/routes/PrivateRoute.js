import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function PrivateRoute() {
  // custom hook
  const [auth, setAuth] = useAuth();

  // state
  const [ok, setOk] = useState(false); // Initializing state variable 'ok' with false

  useEffect(() => {
    // This effect runs whenever the value of 'auth?.token' changes
    if (auth?.token) {
      // If the authentication token exists
      setOk(true); // Set 'ok' to true, indicating the user is authenticated
    } else {
      setOk(false); // If the authentication token is null or undefined, set 'ok' to false
    }
  }, [auth?.token]); // Dependency array ensures the effect runs when 'auth?.token' changes

  // Render the protected route if 'ok' is true, otherwise render a loading indicator
  return ok ? <Outlet /> : "Loading...";
}
