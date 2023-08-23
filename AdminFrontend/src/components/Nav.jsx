import React from 'react'
import { useSelector } from 'react-redux';


function Nav({ Toggle }) {
    const loginStatus = useSelector((state)=>state.auth.status) 
    debugger
    return (<div>
        {loginStatus && 
             <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
        <i className=" bi bi-justify-left fs-5 me-3"
            onClick={Toggle}>
        </i>
         </nav>
        }
        </div>
       )
}
export default Nav;