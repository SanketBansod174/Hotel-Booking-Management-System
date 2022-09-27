import "./admindashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";

import Table from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";
import { green } from "@mui/material/colors";
import AdminMenu from "../../components/adminMenu/AdminMenu";

const AdminDashboard = () => {
  return (
    <div >
      {/* <Sidebar /> */}

      <div className="homeContainer">
        <div className="adminNav">
          <Navbar />
        </div >
        <div className="adminmenu">
        <AdminMenu /></div>

        <b>Booking Recods</b>
        <div className="listContainer">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
