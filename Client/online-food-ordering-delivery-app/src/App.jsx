import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import Dashboard from "./components/Customer/Dashboard";
import Restaurants from "./components/Customer/Restaurants";
import Menu from "./components/Customer/Menu";
import OrderDetails from "./components/Customer/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Login/Register";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/authSlice";
import { useEffect } from "react";
import Header from "./components/Styling/Header";
import Footer from "./components/Styling/Footer";
import Profile from "./components/Customer/Profile";

function App() {
  const loginStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage["token"] && sessionStorage["token"].length > 0) {
      dispatch(login());
    }
  }, [dispatch]);
  
  return (
    <>
      {loginStatus && <Header />}
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/restaurants" exact element={<Restaurants />}></Route>
        <Route path="/menu" exact element={<Menu />}></Route>
        <Route path="/order-details" exact element={<OrderDetails />}></Route>
        <Route path="/register-customer" exact element={<Register />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>
        <Route path="*" exact element={<Login />}></Route>
      </Routes>
      <ToastContainer />
      {loginStatus && <Footer />}
    </>
  );
}

export default App;
