import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./list.css";
const List = () => {
  const location = useLocation();
  
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(99999);
  const [hotelType,setHotelType]=useState(location.state.hotelType);

  console.log(hotelType);

  const heading = "List";

  const { data, loading, error, refetch } = useFetch("/hotel");

if(data.length===0){
  console.log("data is empty");
 
 //data= await axios.get(`http://localhost:8080/api/hotel`)

}




  return (
    <div>
      <div className="navb">
        <Navbar text={heading} />
      </div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            {/* <h1 className="lsTitle">Search</h1> */}
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                className="lsdestinationInput"
                onChange={e=>setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "d-MMM")} To  ${format(
                  dates[0].endDate,
                  "d-MMM"
                )}`}{" "}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  className="date"
                />
              )}
            </div>
            <div className="lsItem">
              <label>Min price </label>
              <input type="number" min={1000} className="lsOptionInput" value={min}
              onChange={e=>setMin(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Max price </label>
              <input type="number" className="lsOptionInput" onChange={e=>setMax(e.target.value)} min={1000} value={max} />
            </div>
            <div className="lsItem">
              <label>Guest </label>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.person}
              />
            </div>

            
          </div>
          <div className="listResult">
            {loading ? (
              "loading wait.. "
            ) : (
              <>
                {data.filter(item=>item.available).filter(item=>item.prices>min && item.prices<max ).filter(item=>item.type.includes(hotelType)).filter(item=>item.city.includes(destination)).map((item,i) => (
                  <SearchItem key={i} item={item}  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
