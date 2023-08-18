import { Route, Switch } from "react-router-dom";
import Login from "./Component/Login/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import Dashboard from "./Component/Customer/Dashboard";
import Restaurants from "./Component/Customer/Restaurants";
import Menu from "./Component/Customer/Menu";
import OrderDetails from "./Component/Customer/OrderDetails";

function LandingPage() {
    return (
    <>
        <Switch>
            <Route path='/dashboard' exact component={Dashboard}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/restaurants' exact component={Restaurants}></Route>
            <Route path='/menu' exact component={Menu}></Route>
            <Route path='/order-details' exact component={OrderDetails}></Route>
            <Route path='*' exact component={Login}></Route>
        </Switch>
    </>);
}

export default LandingPage;