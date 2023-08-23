import { useNavigate } from "react-router-dom";

import Login from "./Login";


function ProtectedRoute(prop){
    debugger
    const navigate = useNavigate()
    if(sessionStorage.getItem('token') == undefined)
    {
        debugger
        return <Login/>
    }
    else
    {
        debugger
         return <prop.component/>
    }

}

export default ProtectedRoute