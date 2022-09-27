import "./hotel.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import Message from "../../components/message/Message";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";


const Hotel = () => {
  const navigate =useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const id = location.pathname.toString().split("/")[2];
  const { data, loading, error, refetch } = useFetch(`/hotel/${id}`);
  const URL = `http://localhost:8080/api/room/images/${id}`;
  const requestData = () => fetch(URL).then((res) => res.json());
  const [dataimg, setDataimg] = useState([]);
  useEffect(() => {
    requestData().then((data) => setDataimg(data));
  }, []);
  
    const {destination,dates,options}=useContext(SearchContext)
   // const [city, setCity] = useState();
   // setCity(destination);
//     console.log("=======");
//    console.log(options);
//    console.log(destination);
//    console.log(dates);
//  //  console.log(city);
//    console.log("=======");
 // console.log(location.state);




  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(
    dates[0].endDate,
    dates[0].startDate
  );
  // console.log(days);
  const heading = data.hotelName;
  const { user } = useContext(AuthContext);
const handleClick =()=>{
if(user){
 setOpenModal(true);
}else{
  navigate("/login");
}
}

//style={{ backgroundImage: `url(data:image/jpg;base64,${data.images})` }}
  return (
    <div>
      <div className="navv" >
        <Navbar text={heading} />
      </div>

      <div className="hotelContainer">
        {loading ? (
          "loading"
        ) : (
          <div className="hotelWrapper">
            <h1 className="hotelTitle">Our Rooms</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                {" "}
                {data.city},{data.state}
              </span>
            </div>
          
            <span className="hotelPriceHighlight">
              Book a stay over Rs.{data.prices} at this property and get a free
              Dinner
            </span>
            <div className="hotelImages">
              {dataimg.map((item, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={`data:image/jpg;base64,${item.image}`}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.description}
                  <br />
                  Mobile Number :+91 {data.phoneNumber}
                  <br />
                  Email: {data.email}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay</h1>
              
                <h2>
                  <b>Rs.{data.prices*days}</b>( {days} night)
                </h2>
                <button onClick={handleClick}>Book Now  </button>
              </div>
            </div>
          </div>
        )}{" "}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} hotel={data} day={days}/>}
        <Message />
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
