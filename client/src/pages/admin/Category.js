import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating");
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
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
        console.log(err.message);
        toast.error("Create category failed. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating");
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
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
        console.log(err.message);
        toast.error("Category may already exist. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Deleting");
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        loadCategories();
        setVisible(false);
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
        console.log(err.message);
        toast.error("Category may already exist. Try again.");
        toast.dismiss(toastId);
      }
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />

          <div className="container col-md-12 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1 className="mb-5">Welcome to the Admin Category</h1>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
              {/* <hr className="my-2 mx-0" /> */}
            </div>
          </div>

          <div className="container col-md-6 px-5">
            <div className="content">
              {categories?.map((c) => (
                <button
                  key={c._id}
                  className="btn btn-outline-primary btn-sm m-1"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}

              <Modal
                open={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <CategoryForm
                  value={updatingName}
                  setValue={setUpdatingName}
                  handleSubmit={handleUpdate}
                  buttonText="Update"
                  handleDelete={handleDelete}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
