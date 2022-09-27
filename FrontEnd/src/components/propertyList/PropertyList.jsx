import "./propertyList.css";
import apartment from "./images/apartment.jpg";
import cabins from "./images/cabins.jpg";
import hotel from "./images/hotel.jpg";
import resorts from "./images/resorts.jpg";
import villas from "./images/villas.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PropertyList = () => {

   const navigate = useNavigate();
   var enddat= new Date();
   enddat.setDate(enddat.getDate()+1);
   
   const [dates, setDates] = useState([
     {
       startDate: new Date(),
       endDate: enddat,
       key: "selection",
     },
   ]);

   const [options, setoptions] = useState({
    person: 1,
  });
   var destination="";
  const handleSearch = (event,message) => {
  //   var hotelType=type;

  //  navigate("/hotels",{state:{hotelType}});
//navigate("/hotels");
console.log("image click");

//navigate("/hotels");
const hotelType=message;
//console.log(hotelType);
navigate("/hotels",{state:{destination,dates,options,hotelType}});
 };




  return (
    <div className="pList">
      <div className="pListItem" >
        <img src={hotel} alt="" className="pListImg"  onClick={(event )=>handleSearch(event,``)} />
        <div className="pListTitles">
          <h1>Hotels</h1>
        </div>
      </div>
      <div className="pListItem">
        <img src={apartment} alt="" className="pListImg" onClick={(event )=>handleSearch(event,`APARTMENTS`)}/>
        <div className="pListTitles">
          <h1>Apartments</h1>
        </div>
      </div>
      <div className="pListItem">
        <img src={resorts} alt="" className="pListImg" onClick={(event )=>handleSearch(event,`RESORT`)}/>
        <div className="pListTitles">
          <h1>Resorts</h1>
        </div>
      </div>
      <div className="pListItem">
        <img src={villas} alt="" className="pListImg" onClick={(event )=>handleSearch(event,`VILLAS`)}/>
        <div className="pListTitles">
          <h1>Villas</h1>
        </div>
      </div>
      <div className="pListItem">
        <img src={cabins} alt="" className="pListImg" onClick={(event )=>handleSearch(event,`CABINS`)} />
        <div className="pListTitles">
          <h1>Cabins</h1>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
