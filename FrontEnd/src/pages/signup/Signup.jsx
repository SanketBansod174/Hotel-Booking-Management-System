import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [credentials, setCredentials] = useState({});

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    onsubmit();
  };

  const [err, setError] = useState("");

  console.log(credentials.mail);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/signup",
        credentials
      );
      console.log(res);

      navigate("/login");
    } catch (err) {
      setError("Fail to Register ");

      console.log(err);
    }
  };

  const onsubmit = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[A-Za-z]\w{7,14}$/;

    if (emailRegex.test(credentials.mail)) {
      setVerify(true);
    } else {
      setError("Invalid Email");
    }
  };


  return (
    <div className="rcontainer">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">Register </h2>
            <h4 style={{ color: "red" }}>{err}</h4>
            <div className="card-body py-md-4">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    required
                    id="mail"
                    placeholder="Email"
                    name="mail"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    required
                    minLength={10}
                    maxLength={10}
                    id="phoneNumber"
                    placeholder="phoneNumber"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    className="form-control"
                    required
                    id="city"
                    placeholder="City"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className="form-control"
                    required
                    id="zipcode"
                    placeholder="Zipcode"
                    min={100000}
                    max={999999}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="state"
                    placeholder="State"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="country"
                    placeholder="Country"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/login">Login</Link>
                  <button
                    className="btn btn-primary"
                    disabled={!verify}
                    onClick={handleClick}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
