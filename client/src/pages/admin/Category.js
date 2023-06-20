import { useState } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating");
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        setName("");
        toast.success(`"${data.name}" is created`);
        toast.dismiss(toastId);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-6 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1 className="mb-5">Welcome to the Admin Category</h1>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="inputCategory4" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCategory4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
