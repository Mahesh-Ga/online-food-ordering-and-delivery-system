import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import Dashboard from "./components/Customer/Dashboard";
import Restaurants from "./components/Customer/Restaurants";
import Menu from "./components/Customer/Menu";
import OrderDetails from "./components/Customer/OrderDetails";
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/restaurants" exact element={<Restaurants />}></Route>
        <Route path="/menu" exact element={<Menu />}></Route>
        <Route path="/order-details" exact element={<OrderDetails />}></Route>
        <Route path="*" exact element={<Login />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
