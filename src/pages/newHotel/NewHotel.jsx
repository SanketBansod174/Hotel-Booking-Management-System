import "./newHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import { hotelInputs } from "../../formSource";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import AdminMenu from "../../components/adminMenu/AdminMenu";

const NewHotel = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { user } = useContext(AuthContext);
console.log(info)
// console.log(file)
  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate()
  const handleClick=async (e)=>{
    e.preventDefault();
    try {
      const formData=new FormData();
      formData.append('file',file)
      formData.append('jsondata',JSON.stringify(info))
      //const res = await axios.post("http://localhost:8080/api/hotel",form);
    //   console.log(res);
    //   navigate("/hotel");
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/hotel',
      data: formData,
      header: {
        'Authorization': `Bearer ${user.jwt}` ,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       
      },
  })
  .then(function (response) {
    navigate("/hotel")
      console.log(response);
      
  })
  .catch(function (response) {
      console.log(response);
  });


    } catch (error) {
      console.log(error)
      navigate("/hotel/new");
    }
    
    }

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div  className="adminNav"><Navbar /> </div>
        <div className="adminmenu">
          <AdminMenu/></div>
        <div className="top">
         
        
          <h1>New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Available</label>
                <select id="available" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Type</label>
                <select id="type" onChange={handleChange}>
                  <option value={"RESORT"}>RESORT</option>
                  <option value={"SUITE"}>SUITE</option>
                  <option value={"BUSINESS"}>BUSINESS</option>
                  <option value={"MOTEL"}>MOTEL</option>
                  <option value={"CABINS"}>CABINS</option>
                  <option value={"VILLAS"}>VILLAS</option>
                  <option value={"APARTMENTS"}>APARTMENTS</option>
                </select>
              </div>
              <div className="formInput">
                <label>Rating</label>
                <select id="rating" onChange={handleChange}>
                  <option value={1} >1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                 
                </select>
              </div>

              {hotelInputs.map((input) => (
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

export default NewHotel;
