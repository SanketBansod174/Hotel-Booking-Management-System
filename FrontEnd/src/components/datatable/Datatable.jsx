import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { user } = useContext(AuthContext);


  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  const navigate = useNavigate();
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${path}/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.jwt}` 
        }
      });
      setList(list.filter((item) => item.id !== id));
    } catch (error) {}
  };

  const handleEdit = async (id) => {
    try {
     const res= await axios.get(`http://localhost:8080/api/${path}/${id}`,{
      headers: {
        'Authorization': `Bearer ${user.jwt}` 
      }
    });
    // console.log(res.data);
    navigate(`/${path}/update`,{state:{data:res.data}});
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Datatable;
