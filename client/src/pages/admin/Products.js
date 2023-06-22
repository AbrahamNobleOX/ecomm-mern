import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminProducts() {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid main-content">
        <div className="row">
          <AdminMenu />
          <div className="container col-md-9 px-4 py-2">
            <div className="content">
              <h1>Welcome to the Product List</h1>
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/update/${p.slug}`}
                >
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                          alt={p.name}
                          className="img img-fluid rounded-start"
                        />
                      </div>

                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(p.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
