import "./newRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import { roomInputs } from "../../formSource";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import AdminMenu from "../../components/adminMenu/AdminMenu";
const NewRoom = () => {
  const [info, setInfo] = useState({});
  const { user } = useContext(AuthContext);
  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  // console.log(info);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/room", info,{
        headers: {
          'Authorization': `Bearer ${user.jwt}` 
        }
      });
      console.log(res);
      navigate("/room");
    } catch (error) {
      navigate("/room/new");
    }
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div  className="adminNav"><Navbar /> </div>
        <div className="adminmenu">
          <AdminMenu/></div>
        <div className="top">
   
          <h1> New Room</h1>
        </div>
        <div className="bottom">
          
          <div className="formInput">
            <label>Available</label>
            <br />
            <select id="available" onChange={handleChange}>
              <option defaultValue={true} value={true}>YES</option>
              <option defaultValue={true} value={false}>NO</option>
            </select>
          </div>
          <div className="formInput">
            <label>Room Type</label>
            <br />
            <select id="roomType" onChange={handleChange}>
              <option value={"AC"}>AC</option>
              <option value={"NONAC"}>NONAC</option>
            </select>
          </div>
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
