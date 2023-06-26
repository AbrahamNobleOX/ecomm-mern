import Menu from "../components/nav/Menu";
import { useSearch } from "../context/search";
import ProductCard from "../components/cards/ProductCard";

export default function Search() {
  const [values, setValues] = useSearch();

  return (
    <>
      <Menu />
      <div className="container main-content mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-center">
                {values?.results?.length < 1
                  ? `No products found for "${values?.keyword}"`
                  : `Found ${values?.results?.length} products for "${values?.keyword}"`}
              </h2>
            </div>
            <div className="row">
              {values?.results?.map((p) => (
                <div key={p._id} className="col-md-3 mb-4">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
