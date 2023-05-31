import { Link } from "react-router-dom";

export default function Footer({ caption, image }) {
  return (
    <>
      <footer className="text-dark shadow-lg">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-4">
              <div class="d-flex flex-row mb-3">
                <Link className="navbar-brand" to="#">
                  <img
                    src="https://getbootstrap.com//docs/5.3/assets/brand/bootstrap-logo.svg"
                    alt="Logo"
                    width={30}
                    height={24}
                    className="d-inline-block"
                  />
                  <span className="text-end fs-6"> Ecommerce </span>
                </Link>
              </div>
              <h6>Address</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Address: 123 Street, City</li>
                <li>Phone: 123-456-7890</li>
                <li>Email: info@example.com</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-unstyled">
                <li>Careers</li>
                <li>Terms & conditons</li>
                <li>Policy</li>
                <li>Blog</li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
