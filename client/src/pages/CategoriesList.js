import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Menu from "../components/nav/Menu";

export default function CategoriesList() {
  const categories = useCategory();

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <h2 className="mb-4 text-center">All Categories</h2>
          {categories?.map((c) => (
            <div className="col-md-3" key={c._id}>
              <Link
                className="btn btn-light col-12 p-3 mb-3 text-dark non-text-decoration"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
