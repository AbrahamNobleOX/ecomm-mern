import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";

export default function AdminProductUpdate() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);

  // hook
  const navigate = useNavigate();
  const params = useParams();

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

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category._id);
      setShipping(data.shipping);
      setQuantity(data.quantity);
      setId(data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating");
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      // console.log(...productData);
      const { data } = await axios.put(`/product/${id}`, productData);
      if (data?.error) {
        toast.error(data.error);
        toast.dismiss(toastId);
      } else {
        toast.success(`"${data.name}" is updated`);
        navigate("/dashboard/admin/products");
        toast.dismiss(toastId);
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again.");
      toast.dismiss(toastId);
    }
  };

  const handleDelete = async (req, res) => {
    const toastId = toast.loading("Deleting");
    try {
      setVisible(false);
      const { data } = await axios.delete(`/product/${id}`);
      // console.log(data);
      toast.success(`"${data.removed.name}" is deleted`);
      toast.dismiss(toastId);
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="container-fluid main-content mb-5">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-12 d-flex justify-content-center px-5 py-2">
            <div className="content">
              <h1 className="mb-5">Welcome to the Admin Update Product</h1>

              {photo ? (
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    className="img-thumbnail"
                    width="400px"
                  />
                </div>
              ) : (
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={`${
                      process.env.REACT_APP_API
                    }/product/photo/${id}?${new Date().getTime()}`}
                    alt="product photo"
                    className="img-thumbnail"
                    width="400px"
                  />
                </div>
              )}
              <div className="col-md-12 mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image File
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="photo"
                  accept="image/*"
                  id="formFile"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  // hidden
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="inputCategory4" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="inputCategory4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="inputCategory4" className="form-label">
                  Product Price (&pound;)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00"
                  id="inputCategory4"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="formFile" className="form-label">
                  Product Category
                </label>
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Choose category"
                  size="large"
                  onChange={(value) => setCategory(value)}
                  value={category}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={categories?.map((c) => ({
                    key: c._id,
                    label: c.name,
                    value: c._id,
                  }))}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="formFile" className="form-label">
                  Product Shipping
                </label>
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Choose shipping"
                  size="large"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: "Yes",
                    },
                    {
                      value: 0,
                      label: "No",
                    },
                  ]}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="inputCategory4" className="form-label">
                  Product Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="0"
                  id="inputCategory4"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="col-12 d-flex justify-content-end">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Update
                </button>
                <button
                  onClick={() => {
                    setVisible(true);
                  }}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>

                <Modal
                  open={visible}
                  onOk={handleDelete}
                  onCancel={() => setVisible(false)}
                >
                  Are you sure you want to delete this?
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
