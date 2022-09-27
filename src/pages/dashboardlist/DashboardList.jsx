import "./dashboardlist.css"
import Sidebar from "../../components/sidebar/Sidebar"
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar";
const List = ({columns}) => {
  return (
    <div className="dashlist">
      {/* <Sidebar/> */}
      <div className="dashlistContainer">
        <div  className="adminNav"><Navbar /> </div>
        <div className="adminmenu">
          <AdminMenu/></div>
        <br/>
        <Datatable columns={columns} />
      </div>
    </div>
  )
}

export default List