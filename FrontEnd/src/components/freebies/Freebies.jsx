import React from "react";
import breakfast from "./images/breakfast.jpg";
import dinner from "./images/dinner.jpg";
import drinks from "./images/drinks.jpg";
import "./freebies.css";

const Freebies = () => {
  return (
    <div>
      
      <h2>We Offer to Our Guest</h2>
    <div className="free">
      <div className="freeItem">
        <img src={breakfast} alt="" className="freeImg"></img>
        <div className="freeTitles">
          <h3>Free Breakfast</h3>
        </div>
      </div>
      <div className="freeItem">
        <img src={dinner} alt="" className="freeImg"></img>
        <div className="freeTitles">
          <h3>Free Dinner</h3>
        </div>
      </div>
      <div className="freeItem">
        <img src={drinks} alt="" className="freeImg"></img>
        <div className="freeTitles">
          <h3>Free Drinks</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Freebies;
