import "./roomImages.css";
import Sidebar from "../../components/sidebar/Sidebar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Navbar from "../../components/navbar/Navbar";
const RoomImage = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [imageFile, setImageFile] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  console.log(info.hotelId);
  // console.log(file);
  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    // try {
    //   //const formData = new FormData();
    //  // formData.append("file", Object.values(file));
    //   // formData.append("jsondata", JSON.stringify(info));
    //   //const res = await axios.post("http://localhost:8080/api/hotel",form);
    //   //   console.log(res);
    //   //   navigate("/hotel");
    //   axios({
    //     method: "post",
    //     url: `http://localhost:8080/api/room/images/${info.hotelId}`,
    //     // data: 0,
    //     header: {
    //       Accept: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (response) {
    //       console.log(response);
    //     });
    // } catch (error) {
    //   console.log(error);
    //   // navigate("/hotel/new");
    // }

    const formData = new FormData();
    imageFile.forEach((image) => formData.append("file", image));
    //1st argumet 'imageFile' name must be matches with spring-boot requeat param name MultipartFile imageFile

    console.log(imageFile);
    console.log(formData);
    axios
      .post(`http://localhost:8080/api/room/images/${info.hotelId}`, formData, {
        headers: {
          "Content-type":
            "multipart/form-data;boundary=<calculated when request is sent>",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (event) => {
    let arr = imageFile;
    arr.push(event.target.files[0]);
    setImageFile(arr);
    showImage();
  };

  const showImage = () => {
    if (imageFile.length < 1) return;
    const newImageURL = [];
    imageFile.forEach((image) => newImageURL.push(URL.createObjectURL(image)));
    setImageURLs(newImageURL);
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
      <div  className="adminNav"><Navbar /> </div>
        <div className="adminmenu">
          <AdminMenu/></div>
        <div className="top">
          <h1>Add Room Images To Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {imageURLs.map((image) => (
              <p>
                {" "}
                <img
                  src={image}
                  style={{ height: "200px", width: "200px" }}
                ></img>
                &emsp;&emsp;
              </p>
            ))}
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
                  multiple
                  //  onChange={(e) => setFile(e.target.files[0])}
                  onChange={handleImage}
                />
              </div>

              <div className="formInput">
                <label>Hotel id</label>
                <input
                  type="number"
                  style={{ textTransform: "none" }}
                  onChange={handleChange}
                  id="hotelId"
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

export default RoomImage;
