import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import { Select } from "antd";
import toast from "react-hot-toast";

export default function AdminOrders() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
      toast.success("Order Status Updated");
    } catch (err) {
      toast.error("Update Request failed. Try again.");
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the User Orders</h1>
              {orders?.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="border shadow bg-light rounded-4 mb-5"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Ordered</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              // showSearch
                              className="w-75"
                              placeholder="Change Order Status"
                              size="large"
                              onChange={(value) => handleChange(o._id, value)}
                              value={o?.status}
                              // filterOption={(input, option) =>
                              //   (option?.label ?? "")
                              //     .toLowerCase()
                              //     .includes(input.toLowerCase())
                              // }
                              options={status?.map((s, i) => ({
                                key: i,
                                label: s,
                                value: s,
                              }))}
                            />
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length} products</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="container">
                      <div className="row m-2">
                        {o?.products?.map((p, i) => (
                          <ProductCardHorizontal key={i} p={p} remove={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
