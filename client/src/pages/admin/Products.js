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
          <div className="container col-md-6 px-5 py-2">
            <div className="content">
              <h1 className="mb-5 d-flex justify-content-center">
                Welcome to the Product List
              </h1>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products?.map((p) => (
                  <Link
                    className="non-text-decoration"
                    key={p._id}
                    to={`/dashboard/admin/product/update/${p.slug}`}
                  >
                    <div className="col">
                      <div className="card h-100">
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${
                            p._id
                          }?${new Date().getTime()}`}
                          alt={p.name}
                          className="card-img-top"
                          width="250px"
                          height="250px"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                        </div>
                        <div className="card-footer">
                          <small className="text-body-secondary">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
