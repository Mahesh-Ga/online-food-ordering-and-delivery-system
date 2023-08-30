
import Login from "./Login";


function ProtectedRoute(prop){
    debugger
    
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