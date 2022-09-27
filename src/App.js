import Home from "./pages/home/Home";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/login";
import Payment from "./pages/payment/Payment";
import Signup from "./pages/signup/Signup";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DashList from "./pages/dashboardlist/DashboardList";
import Single from "./pages/single/Single";
import { roomInputs, userInputs } from "./formSource";
import New from "./pages/newUser/New";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  hotelColumns,
  roomColumns,
  userColumns,
  paymentColumns,
} from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import RoomImage from "./pages/roomImages/RoomImage";
import UpdateNew from "./pages/updateUser/UpdateNew";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user == null) {
      return <Navigate to="./login" />;
    } else if (user.userRole == "ROLE_USER") {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/user">
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashList columns={userColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="update"
              element={
                <ProtectedRoute>
                  <UpdateNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/hotel">
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashList columns={hotelColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="update"
              element={
                <ProtectedRoute>
                  <UpdateHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              }
            />

            <Route
              path="roomimage"
              element={
                <ProtectedRoute>
                  <RoomImage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/room">
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashList columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="update"
              element={
                <ProtectedRoute>
                  <UpdateRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="payment">
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashList columns={paymentColumns} />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/login" element={<Login />} />
        <Route path="/paymentt" element={<Payment />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
