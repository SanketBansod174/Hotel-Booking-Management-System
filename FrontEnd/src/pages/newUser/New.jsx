import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import AdminMenu from "../../components/adminMenu/AdminMenu";

const New = ({ inputs, title }) => {
 
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate()
const handleClick=async (e)=>{
e.preventDefault();
try {
  const res = await axios.post("http://localhost:8080/api/user",info);
  console.log(res);
  navigate("/user");
} catch (error) {
  navigate("/user/new");
}

}

console.log(info)
  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div  className="adminNav"><Navbar /> </div>
        <div className="adminmenu">
          <AdminMenu/></div>
        <div className="top">
          {/* <h1>{title}</h1> */}
         
          <h1>  New User</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                  style={{textTransform:"none"}}
                    onChange={handleChange}
                    type={input.type}
                    id={input.id}
                  />
                </div>
              ))}<br/>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
