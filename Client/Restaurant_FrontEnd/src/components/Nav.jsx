import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../features/toggleSlice';
import { setRestaurant } from '../features/restaurantSlice';

function Nav() {
    const loginStatus = useSelector((state)=>state.auth.status) 
    const dispatch = useDispatch();
    
   
    debugger
    return (<div >
        {loginStatus && 
             <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
        <i className=" bi bi-justify-left fs-5 me-3"
            onClick={()=>{dispatch(setToggle())}}>
        </i>
         </nav>
        }
        </div>
       )
}
export default Nav;