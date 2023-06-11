import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function AdminRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get(`/admin-check`);

        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // Check if the "auth.token" dependency has a value
    if (auth?.token) {
      // If "auth.token" is not null or undefined, call the "authCheck" function
      adminCheck();
    }
  }, [auth?.token]); // Dependency array ensures the effect runs when 'auth?.token' changes

  return ok ? <Outlet /> : <Loading path="" />;
}
