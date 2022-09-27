import "./searchItem.css";
import React from "react";
import test from "./images/test.png";
import { Link, useLocation } from "react-router-dom";

const SearchItem = ({ item }) => {
  
 
   var base64Image=`data:image/jpg;base64,${item.images}`;

 
  return (
    <div className="searchItem">
      {/* <img src={test} alt="" className="siImg" /> */}
      <img src={ base64Image} alt="" className="siImg" />
      
      <div className="siDesc">
        <h1 className="siTitle">{item.hotelName}</h1>
        <span className="siDistance">{item.city}</span>
       
        <span className="siSubtitle">
          {item.title}
        </span>
        <span className="siFeatures">{item.description}</span>
        
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span></span>
          <button>Rating {item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{item.prices}</span>
          <span className="siTaxOp"></span>
          <Link to={`/hotels/${item.id}`} >
            <button className="siCheckButton">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
