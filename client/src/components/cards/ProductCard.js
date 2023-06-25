import moment from "moment";

export default function ProductCard({ p }) {
  return (
    <>
      <div className="col-sm-4 mb-3 mb-sm-4" key={p._id}>
        <div className="card">
          <img src="" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">{p.name}</p>
            <p className="card-text">{moment(p.createdAt).fromNow()}</p>
            <p className="card-text">{p.sold} sold</p>
          </div>
        </div>
      </div>
    </>
  );
}
