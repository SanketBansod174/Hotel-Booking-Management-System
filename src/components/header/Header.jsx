import React, { useState } from "react";
import "./header.css";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  fahotel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Header = () => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  var enddat= new Date();
  enddat.setDate(enddat.getDate()+1);
  const hotelType="";
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: enddat,
      key: "selection",
    },
  ]);
  // const [openOption, setOpenOptions] = useState(false);
  const [options, setoptions] = useState({
    person: 1,
  });

  const handleOption = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

 const {dispatch}=useContext(SearchContext)

  const navigate = useNavigate();
  const handleSearch = () => {
     dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}});
   
    navigate("/hotels",{state:{destination,dates,options,hotelType}});
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <h1 className="headerTitle">
          Any Time Of Year , <br />
          You Find Us Here.
        </h1>
        <p className="headerDesc">
          Rest Journey in Single step,in the breathtaking</p>
     
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going ?"
              className="headerSearchInput"
              onChange={e=>setDestination(e.target.value) }
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >
              IN {"  "}
              {`${format(dates[0].startDate, "d-MMM")} `} OUT
              {` ${format(dates[0].endDate, "d-MMM")}`}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span className="headerSearchText">TOTAL GUESTS</span>
            {/* <span className="headerSearchText">{`${options.person} Person`}</span> */}
            <div className="options">
              <div className="optionItem">
                <div className="optionCounter">
                  <button
                    disabled={options.person <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("person", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{`${options.person} Person`}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("person", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
