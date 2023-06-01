import { useState } from "react";

export default function Register() {
  // state
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="container main-content mb-5">
      <div className="form-floating mb-3 col-6 offset-md-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
          autoFocus
        />
        <label htmlFor="floatingInput">Full Name</label>
      </div>
      <div className="form-floating mb-3 col-6 offset-md-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3 col-6 offset-md-3">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="d-flex flex-row-reverse col-6 offset-md-3">
        <button type="button" className="btn btn-primary w-25">
          Register
        </button>
      </div>

      <div className="col-6 offset-md-3">
        <pre>{JSON.stringify(name, null, 4)}</pre>
      </div>
    </div>
  );
}
