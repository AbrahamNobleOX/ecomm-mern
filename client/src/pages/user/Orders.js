import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import moment from "moment";

export default function UserOrders() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <UserMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the User Orders</h1>
              <p>This is the main content area.</p>
              <pre>{JSON.stringify(orders, null, 4)}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
