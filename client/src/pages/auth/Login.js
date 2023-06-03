import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export default function Login() {
  // state
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("123456");
  // custom hook
  const [auth, setAuth] = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Querying");
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successful");
        toast.dismiss(toastId);
      }
    } catch (err) {
      if (err.message === "Network Error") {
        // Display a specific error message when the network is disabled
        toast.error(
          "Network connection error. Please check your internet connection."
        );
        toast.dismiss(toastId);
      } else {
        // Display a generic error message for other types of errors
        toast.error(err.message);
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <div className="container main-content mb-5">
      <div className="">
        <div className="col-md-6 offset-md-3">
          <p className="text-uppercase fw-bold fs-3">User Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 col-md-6 offset-md-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="floatingEmail">Email Address</label>
          </div>
          <div className="form-floating mb-3 col-md-6 offset-md-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="d-flex flex-row-reverse col-md-6 offset-md-3">
            <button
              type="submit"
              className="btn btn-primary w-25"
              disabled={email.length === 0}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
