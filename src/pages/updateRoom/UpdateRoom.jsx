import "./updateRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const UpdateRoom = () => {
 

  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    //setInfo((pre) => ({ ...pre, [hotelId]:room.hotelId.id }));
  };
  // console.log(info);
 
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state.data;
  const [info, setInfo] = useState(room);
  const [err,setError]  =useState("");
  console.log(info)
 
  const handleClick = async (e) => {
    e.preventDefault();
    try {
     // setInfo((pre) => ({ ...pre, hotelId: hotelId}));
      const res = await axios.put("http://localhost:8080/api/room", info);
      console.log(res);
      navigate("/room");
    } catch (error) {
      setError("Fail to Update")
      
    }
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
        <Link to="/dashboard">
          <h1> Dashboard</h1></Link>  <h4 style={{color:"red"}}>{err}</h4>
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
          <div className="formInput">
            <label>Available</label>
            <br />
            <select id="available" onChange={handleChange}>
              <option defaultValue={room.available} value={false}>No</option>
              <option defaultValue={room.available}  value={true}>Yes</option>
            </select>
          </div>
          <div className="formInput">
            <label>Room Type</label>
            <br />
            <select id="roomType" onChange={handleChange}>
              <option defaultValue={room.roomType} value={"AC"}>AC</option>
              <option defaultValue={room.roomType} value={"NONAC"}>NONAC</option>
            </select>
          </div>
          <div className="right">
            <form>
            <div className="formInput" >
                  <label>Room Id</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                 
                    defaultValue={room.id}
                    id="hotelId.id"
                    disabled="true"
                  />
                </div>
                <div className="formInput" >
                  <label>Hotel Id</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.hotelId.id}
                    id="hotelId"
                    disabled={"true"}
                  />
                </div>
                <div className="formInput" >
                  <label>Room Number</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.roomNumber}
                    id="roomNumber"
                    
                  />
                </div>
                <div className="formInput" >
                  <label>Description</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.description}
                    id="description"
                    
                  />
                </div>
                <div className="formInput" >
                  <label>Room Number</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.roomNumber}
                    id="roomNumber"
                    
                  />
                </div>
                <div className="formInput" >
                  <label>Max Guest</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.maxGuest}
                    id="maxGuest"
                    
                  />
                </div>
                <div className="formInput" >
                  <label>Title</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.title}
                    id="title"
                    
                  />
                </div>
                <div className="formInput" >
                  <label>Prices</label>
                  <input
                    type="text"
                    style={{ textTransform: "none" }}
                    onChange={handleChange}
                    defaultValue={room.prices}
                    id="prices"
                    
                  />
                </div>
            
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
