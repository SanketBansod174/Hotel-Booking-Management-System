import "./adminMenu.css";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="adminmenubar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-nav">
            <Link to="/dashboard">
              <button type="button" className="navbar-brand" href="#">
                Dashboard
              </button>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <button
                type="button"
                className="nav-item nav-link active"
                href="#"
              >
                Users{" "}
              </button>{" "}
            </Link>

            <Link to="/hotel" style={{ textDecoration: "none" }}>
              <button type="button" className="nav-item nav-link" href="#">
                Hotels
              </button>{" "}
            </Link>
            <Link to="/room" style={{ textDecoration: "none" }}>
              <button type="button" className="nav-item nav-link" href="#">
                Rooms
              </button>
            </Link>
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <button type="button" className="nav-item nav-link" href="#">
                Payments
              </button>
            </Link>
            <Link to="/hotel/roomimage" style={{ textDecoration: "none" }}>
              <button type="button" className="nav-item nav-link" href="#">
                Add Images
              </button>{" "}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
