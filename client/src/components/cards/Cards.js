export default function Cards({ caption, image }) {
  return (
    <>
      <div className="container text-center mb-5">
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <img src={image} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">{caption}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <img src={image} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">{caption}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <img src={image} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">{caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
