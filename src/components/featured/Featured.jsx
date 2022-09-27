import React from "react";
import "./featured.css";
import couple from "./images/couple.jpg";
import deluxe from "./images/deluxe.jpg";
import luxurious from "./images/luxurious.jpg";
 
const featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={couple}
          alt=""
          className="featuredImg"
        ></img>
        <div className="featuredTitles">
          <h3>Couple Room</h3>
          <h5>Started from Rs.5000/night</h5>
        </div>
      </div>
      <div className="featuredItem">
        <img src={deluxe}  alt=""
          className="featuredImg"></img>
        <div className="featuredTitles">
          <h3>Deluxe Room</h3>
          <h5>Started from Rs.10000/night</h5>
        </div>
      </div>
      <div className="featuredItem">
        <img src={luxurious}   alt=""
          className="featuredImg"></img>
        <div className="featuredTitles">
          <h3>Luxurious Room</h3>
          <h5>Started from Rs.15000/night</h5>
        </div>
      </div>
    </div>
  );
};

export default featured;
