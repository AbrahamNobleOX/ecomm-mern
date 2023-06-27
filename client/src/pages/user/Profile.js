import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/nav/UserMenu";

export default function UserProfile() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a PUT request to "/profile" endpoint with the data to be updated
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });

      // Check if the response data contains an error property
      if (data?.error) {
        // If an error exists, display it using a toast notification
        toast.error(data.error);
      } else {
        // If the response data doesn't have an error
        // Update the user data in the state or context (auth) with the updated data
        setAuth({ ...auth, user: data });

        // Update the user data in the local storage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);

        // Update the user data in the local storage
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));

        // Display a success toast notification
        toast.success("Profile updated");
      }
    } catch (err) {
      // If an error occurs during the HTTP request, log the error to the console
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <UserMenu />
          <div className="container col-md-12 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1>Welcome to the User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="col-md-12 mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Enter your Address"
                    value={address}
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
