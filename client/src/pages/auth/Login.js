import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Menu from "../../components/nav/Menu";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  // state
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("Abc1234##");
  // custom hook
  const [auth, setAuth] = useAuth();
  // hook
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the 'email' state with the new value from the email input field
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the 'password' state with the new value from the password input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const toastId = toast.loading("Querying"); // Display a loading toast message while querying

    try {
      // Send a POST request to the '/login' endpoint with the email and password as the payload
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data?.error) {
        // If the response data contains an error message, display it as an error toast
        toast.error(data.error);
        toast.dismiss(toastId); // Dismiss the loading toast message
      } else {
        // Store the authentication data in the local storage
        localStorage.setItem("auth", JSON.stringify(data));
        console.log(data);

        // Update the authentication state with the received token and user data
        setAuth({ ...auth, token: data.token, user: data.user });

        // Display a success toast message for successful login
        toast.success("Login successful");
        toast.dismiss(toastId); // Dismiss the loading toast message

        // Navigate to the appropriate dashboard based on the user's role
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      if (err.message === "Network Error") {
        // Display a specific error message when the network is disabled
        toast.error(
          "Network connection error. Please check your internet connection."
        );
        toast.dismiss(toastId); // Dismiss the loading toast message
      } else {
        // Display a generic error message for other types of errors
        toast.error(err.message);
        toast.dismiss(toastId); // Dismiss the loading toast message
      }
    }
  };

  return (
    <>
      <Menu />
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
    </>
  );
}
