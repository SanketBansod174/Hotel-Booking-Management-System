import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [credentials, setCredentials] = useState({
   
  });


  const { loading, error, dispatch } = useContext(AuthContext);
  const [err,setError]=useState("");
  const [verify,setVerify]=useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

   console.log(credentials);
 
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8080/api/signin", credentials);
      // console.log(res.data.userRole);
     
      if(res.data.userRole==="ROLE_USER"){
        setError("Login Success");
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      }else if(res.data.userRole==="ROLE_ADMIN"){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/dashboard");
      }else{
        setError("Fail to Register ")
        dispatch({ type: "LOGOUT", payload: res.data });
      }
      
    } catch (err) {  
      setError("Invalid Creadential Retry");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  function onChange(value) {
    setVerify(true);
  }


  return (
    <div className="rcontainer">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center">Login </h2>
              <h4 style={{color:"red"}}>{err}</h4>
              <div className="card-body py-md-4">
                <form _lpchecked={1}>
                  <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder="Email" onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password"     onChange={handleChange}/>
                  </div>
                  <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />
                  <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/signup">Create Account</Link>
                    <button disabled={!verify} onClick={handleClick}  className="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
