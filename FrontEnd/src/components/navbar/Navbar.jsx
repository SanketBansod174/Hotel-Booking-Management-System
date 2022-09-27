import "./navbar.css";
import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { AuthContext } from "../../context/AuthContext";
const Navbar = (props) => {
  const { user ,dispatch} = useContext(AuthContext);
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navItems">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Hotel Booking </span>
          </Link>
          <div className="username">
            {user ? (
              <>
              <Link to="/dashboard">
                <button className="user" > {user.name}</button></Link>
                <button className="navButton" onClick={logout}>Logout</button>
              </>
            ) : (
              <><Link to="/signup">
                <button className="navButton">Register</button></Link>
                <Link to="/login">
                  <button className="navButton">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="heading">
          <h1>{props.text}</h1>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
