import "./updateNew.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateNew = () => {
 
  const location = useLocation();

  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const user = location.state.data;
  console.log(user);
  const [info, setInfo] = useState(user);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/user", info);
      console.log(res);
      navigate("/user");
    } catch (error) {
      navigate("/user/new");
    }
  };

  console.log(info);
  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
        <Link to="/dashboard">
          <h1> Dashboard</h1></Link>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
            <div className="formInput">
                <label>Id</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="id"
                  defaultValue={user.id}
                  disabled="true"
                />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  defaultValue={user.name}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="phoneNumber"
                  defaultValue={user.phoneNumber}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="city"
                  defaultValue={user.city}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="country"
                  defaultValue={user.country}
                />
              </div>
              <div className="formInput">
                <label>Mail</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="mail"
                  defaultValue={user.mail}
                />
              </div>
              <div className="formInput">
                <label>State</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="state"
                  defaultValue={user.state}
                />
              </div>
              <div className="formInput">
                <label>Zip Code</label>
                <input
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  type="text"
                  id="zipcode"
                  defaultValue={user.zipcode}
                />
              </div>
              <div className="formInput">
                <label>Role</label>
                <select id="userRole" onChange={handleChange}>
                  <option defaultValue={user.userRole} value={"ROLE_USER"}>User</option>
                  <option defaultValue={user.userRole} value={"ROLE_ADMIN"}>Admin</option>
                </select>
              </div><div>
              <button
                type="text"
                className="submit-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button onClick={handleClick} className="submit-btn">Update</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNew;
