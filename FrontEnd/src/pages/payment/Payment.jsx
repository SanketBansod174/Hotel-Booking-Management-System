import "./payment.css";
import card from "./images/card_img.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import axios from "axios";
//import { Link, useHistory } from "react-router-dom";
const Payment = () => {
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  console.log(user.jwt);
  const location = useLocation();
  //const history = useHistory();
  const address = `${location.state.hotel.city},${location.state.hotel.state} No:${location.state.hotel.phoneNumber} Email:${location.state.hotel.email}`;
  const navigate = useNavigate();
 
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [msg, setMsg] = useState("")
  const [credentials, setCredentials] = useState({
    userId:user.id,
    hotelId: location.state.hotel.id,
    roomNumber: location.state.rooms,
    total:location.state.total,
    dateForm:dates[0].startDate,
    dateTo:dates[0].endDate,

  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
     // const res = await axios.post("http://localhost:8080/api/payment",credentials);
     
      const res = await axios.post("http://localhost:8080/api/payment",
        credentials
      , {
        headers: {
          'Authorization': `Bearer ${user.jwt}` 
        }
      });
     
     
     
     
     
     
      console.log(res);
     // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
     // navigate("/")
     setMsg(res.data);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
        console.log(err)
        setMsg("Payment Failed Try After Some Time ");
      //dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };



  return (
    <div className="container">
      <form action onSubmit={handleSubmit}><div className="msg"><b >{msg}</b></div>
        <div className="row">
          <div className="col">
            <h3 className="title">Booking Details</h3>
            <div className="inputBox">
              <span>Hotel name :</span>
              <input
                type="text"
                value={location.state.hotel.hotelName}
                disabled={true}
              />
            </div>
            <div className="inputBox">
              <span>Room Numbers :</span>
              <input
                type="email"
                value={location.state.rooms}
                disabled={true}
              />
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input type="text" value={address}  disabled={true} />
            </div>
            <div className="inputBox">
              <span>Total Bill :</span>
              <input
                type="text"
                value={location.state.total}
                disabled={true}
              />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>DateFrom :</span>
                <input
                  type="text"
                  value={format(dates[0].startDate, "dd-MMM-yyy")}
                  disabled={true}
                />
              </div>
              <div className="inputBox">
                <span>DateTo :</span>
                <input
                  type="text"
                  value={format(dates[0].endDate, "dd-MMM-yyy")}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className="title">billing address</h3>
            <div className="inputBox">
              <span>full name :</span>
              <input type="text" value={user.name}  disabled={true} />
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input type="email" value={user.mail}  disabled={true} />
            </div>
            <div className="inputBox">
              <span>City :</span>
              <input type="text" value={user.city}  disabled={true}/>
            </div>
            <div className="inputBox">
              <span>State :</span>
              <input type="text" value={user.state}  disabled={true} />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Country :</span>
                <input
                  type="text"
                  value={user.country}
                  disabled={true}
                />
              </div>
              <div className="inputBox">
                <span>zip code :</span>
                <input
                  type="text"
                  value={user.zipcode}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className="title">payment</h3>
            <div className="inputBox">
              <span>cards accepted :</span>
              <img src={card} alt="" />
            </div>
            <div className="inputBox">
              <span>name on card :</span>
              <input type="text"  id="cardHolderName" onChange={handleChange}  required/>
            </div>
            <div className="inputBox">
              <span>credit card number :</span>
              <input
                type="number"
                placeholder="1111-2222-3333-4444" id="cardNumber"
                onChange={handleChange} required
              />
            </div>
            <div className="inputBox">
              <span>exp month :</span>
              <input type="text" placeholder="january" required />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>exp year :</span>
                <input type="number" placeholder={2022} min={2022} required />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input type="text" placeholder={1234} required/>
              </div>
            </div>
          </div>
        </div>

        <div className="button">
          <button
            type="text"
            className="submit-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="text" className="submit-btn" onClick={handleClick}>
            proceed to checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
