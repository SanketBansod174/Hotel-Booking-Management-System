import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";

const List = () => {
const { data, loading, error, refetch } = useFetch("/booking");

console.log(data);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Booking ID</TableCell>
            <TableCell className="tableCell">Hotel Name</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Room Number</TableCell>
            <TableCell className="tableCell">Date From</TableCell>
            <TableCell className="tableCell">Date To</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="tableCell">  {data.id}  </TableCell>
              <TableCell className="tableCell">{data.hotelId.hotelName}          
              </TableCell>
              <TableCell className="tableCell"> {data.userId.name}  </TableCell>
              <TableCell className="tableCell">{data.roomId.id}  </TableCell>
              <TableCell className="tableCell"> {data.dateForm} </TableCell>
              <TableCell className="tableCell"> {data.dateTo}   </TableCell>
              <TableCell className="tableCell"> {data.paymentId.paymentType} </TableCell>
              <TableCell className="tableCell"> {data.paymentId.amount}  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
