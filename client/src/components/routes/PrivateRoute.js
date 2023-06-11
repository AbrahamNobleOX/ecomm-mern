import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function PrivateRoute() {
  // custom hook
  const [auth, setAuth] = useAuth();

  // state
  const [ok, setOk] = useState(false); // Initializing state variable 'ok' with false

  useEffect(() => {
    // Define an async function named "authCheck" to perform the authentication check
    const authCheck = async () => {
      try {
        // Make a GET request to the "/auth-check" endpoint on the server
        const { data } = await axios.get(`/auth-check`);

        // Check if the response data has the "ok" property set to true
        if (data.ok) {
          // If the response is successful, set the "ok" state variable to true
          setOk(true);
        } else {
          // If the response is not successful, set the "ok" state variable to false
          setOk(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // Check if the "auth.token" dependency has a value
    if (auth?.token) {
      // If "auth.token" is not null or undefined, call the "authCheck" function
      authCheck();
    }
  }, [auth?.token]); // Dependency array ensures the effect runs when 'auth?.token' changes

  // useEffect(() => {
  //   // This effect runs whenever the value of 'auth?.token' changes
  //   if (auth?.token) {
  //     // If the authentication token exists
  //     setOk(true); // Set 'ok' to true, indicating the user is authenticated
  //   } else {
  //     setOk(false); // If the authentication token is null or undefined, set 'ok' to false
  //   }
  // }, [auth?.token]); // Dependency array ensures the effect runs when 'auth?.token' changes

  // Render the protected route if 'ok' is true, otherwise render a loading indicator
  return ok ? <Outlet /> : <Loading />;
}
