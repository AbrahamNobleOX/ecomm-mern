export default function Jumbotron({
  title,
  subTitle = "Welcome to our E-commerce Store!",
}) {
  return (
    <div className="container rounded-4 p-5 bg-light shadow-lg mb-5">
      {/* <img
        src="https://th.bing.com/th/id/R.e1707c345d5ac10c80a674030e606643?rik=pOsTg5KBoLuNvw&riu=http%3a%2f%2fwww.snut.fr%2fwp-content%2fuploads%2f2015%2f08%2fimage-de-paysage.jpg&ehk=1O5SWKkGpZ8yU%2b%2fAnLXG1v8k6BKxgyiXgHbOWBW1ir0%3d&risl=1&pid=ImgRaw&r=0"
        className="col-md-4 float-md-end mb-3 ms-md-3"
        alt="..."
      /> */}
      <h1 className="display-4">{title}</h1>
      <p className="lead">{subTitle}</p>
      <hr className="my-4" />
      <p className="lead">
        Browse our wide range of products and find what you need.
      </p>
      <div class="d-flex justify-content-end">
        <button className="btn btn-outline-primary btn-md">
          Shop Now <i class="bi bi-box-arrow-up-right"></i>
        </button>
      </div>
    </div>
  );
}
