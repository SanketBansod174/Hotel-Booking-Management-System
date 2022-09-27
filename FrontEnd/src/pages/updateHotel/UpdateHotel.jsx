import "./updateHotel.css";
import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
const UpdateHotel = () => {
  
 
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state.data;
  const [info, setInfo] = useState(hotel);
  console.log(hotel);
 // var base64Image=`data:image/jpg;base64,${hotel.images}`;
  // var reader = new FileReader();
  // let blob = new Blob(new Uint8Array(hotel.images));
  // let filel = reader.readAsArrayBuffer(blob);
//  var blob = new Blob([hotel.images], { type: "image/jpg" });
// var fileBase64String=hotel.images;
// console.log(fileBase64String);
// const decodeFileBase64 =(base65String)=>{
// return decodeURIComponent(
//   atob(base65String).split("").map(function (c){
//     return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//   })
//   .join("")
// );


// };
//const decodeBase64 =decodeFileBase64(fileBase64String.substring(fileBase64String.indexof(",")+1));

// const decodeBase64 =decodeFileBase64(fileBase64String);


  const [file, setFile] = useState("");
  console.log(info);
  // console.log(file)
  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jsondata", JSON.stringify(info));
      //const res = await axios.post("http://localhost:8080/api/hotel",form);
      //   console.log(res);
      //   navigate("/hotel");
      axios({
        method: "put",
        url: "http://localhost:8080/api/hotel",
        data: formData,
        header: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(response);
          navigate("/hotel");
        })
        .catch(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
      navigate("/hotel/new");
    }
  };

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
                <option defaultValue={hotel.available} value={true}>
                    Yes
                  </option>
                  <option defaultValue={hotel.available} value={false}>
                    No
                  </option>
                  
                </select>
              </div>
              <div className="formInput">
                <label>Type</label>
                <select id="type" onChange={handleChange}>
                  <option defaultValue={hotel.type} value={"RESORT"}>
                    RESORT
                  </option>
                  <option defaultValue={hotel.type} value={"SUITE"}>
                    SUITE
                  </option>
                  <option defaultValue={hotel.type} value={"BUSINESS"}>
                    BUSINESS
                  </option>
                  <option defaultValue={hotel.type} value={"MOTEL"}>
                    MOTEL
                  </option>
                  <option defaultValue={hotel.type} value={"CABINS"}>
                    CABINS
                  </option>
                  <option defaultValue={hotel.type} value={"VILLAS"}>
                    VILLAS
                  </option>
                  <option defaultValue={hotel.type} value={"APARTMENTS"}>
                    APARTMENTS
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Rating</label>
                <select id="rating" onChange={handleChange}>
                  <option defaultValue={hotel.rating} value={1}>
                    1
                  </option>
                  <option defaultValue={hotel.rating} value={2}>
                    2
                  </option>
                  <option defaultValue={hotel.rating} value={3}>
                    3
                  </option>
                  <option defaultValue={hotel.rating} value={4}>
                    4
                  </option>
                  <option defaultValue={hotel.rating} value={5}>
                    5
                  </option>
                </select>
              </div>

              <div className="formInput">
                <label>Hotel Id</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  disabled={true}
                  id="id"
                  defaultValue={hotel.id}
                />
              </div>

              <div className="formInput">
                <label>Hotel Name</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="hotelName"
                  defaultValue={hotel.hotelName}
                />
              </div>

              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="city"
                  defaultValue={hotel.city}
                />
              </div>

              <div className="formInput">
                <label>State</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="state"
                  defaultValue={hotel.state}
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="phoneNumber"
                  defaultValue={hotel.phoneNumber}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="email"
                  defaultValue={hotel.email}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="description"
                  defaultValue={hotel.description}
                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="title"
                  defaultValue={hotel.title}
                />
              </div>
              <div className="formInput">
                <label>Prices</label>
                <input
                  type="text"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="prices"
                  defaultValue={hotel.prices}
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

export default UpdateHotel;
