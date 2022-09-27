import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId, hotel, day }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [verify,setVerify]=useState(false);
   const [roomavailabel, setRoomavailabel] = useState({0:false,1:false,2:false});
  const [selectedRoomsPricest, setSelectedRoomsPricest] = useState(0);
  const [available, setAvailable] = useState([]);
  const { data, loading, error } = useFetch(`/room/hotel/${hotelId}`);
  //console.log(data);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  // console.log(data);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const amount = parseInt(e.target.placeholder);
    //console.log(amount);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );

    setSelectedRoomsPricest(
      checked ? amount + selectedRoomsPricest : selectedRoomsPricest - amount
    );

    setVerify(true);
  };

  var temp = false;
  console.log(selectedRoomsPricest);
  const total = day * (hotel.prices + selectedRoomsPricest);

//let available =[];
// available[0]=true;
// available[1]=false;
// available[2]=false;

// const check=()=>{
//   for(let i=0;i<data.length;i++){
//     available[i]=isAvailable(data[i].id);
//     console.log(available[i]);
//   }
// }

// setTimeout(() =>{ for(let i=0;i<data.length;i++){
//   available[i]=isAvailable(data[i].id);
//   console.log(available[i]);
// }}, 1000);






  const isAvailable = async (roomNumber,i) => {
    const body = {
      dateFrom: dates[0].startDate,
      dateTo: dates[0].endDate,
      hotelId: hotelId,
      roomId: roomNumber,
    };
    const rep = await axios.post(`http://localhost:8080/api/room/check`, body);
    //console.log(rep.data);
   // return rep.data;

   setRoomavailabel((pre) => ({ ...pre, [i]: !rep.data }));
   setAvailable([...available, rep.data]);

   console.log(roomavailabel);
  };















  const handleClick = () => {
    setOpen(false);
    navigate("/paymentt", {
      state: { rooms: selectedRooms, hotel: hotel, total: total },
    });
  };

  return (
    <div>
      <div className="reserve">
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {data
            .filter((item) => item.available)
            .map((item, i) => (
              <div className="rItem" key={i}>
                <div className="rInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.description} </div>
                  <div className="rMax">
                    Max People:<b>{item.maxGuest}</b>
                  </div>
                  <div className="rPrice">Rs.{item.prices}</div>
                  {/* <div className="rSelectRooms"></div> */}
                </div>
                <div className="room">
                  <label>Room Number: {item.id}</label>
                  <input
                    type="checkbox"
                    value={item.id}
                    placeholder={item.prices}
                    // onChange={handleSelect}
                    // onChange={() => {
                    //   handleSelect(),
                    //   isAvailable(item.id)
                    // }}
                    // disabled={!isAvailable(item.id)}
                    onChange={(event) => {
                      handleSelect(event);
                      
                    }}
                    // onLoad={check()}
                    // onClick={()=>{isAvailable(item.id,i);
                    // }}

                    onLoad={isAvailable(item.id,i)}

                    disabled={roomavailabel[i]}
                    className="checkbox"
                  />
                </div>
              </div>
            ))}
          <button onClick={handleClick}  disabled={!verify} className="rButton">
            Book Now (Rs.{total})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
