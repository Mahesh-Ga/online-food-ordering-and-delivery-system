import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

function Nav() {
    const loginStatus = useSelector((state)=>state.auth.status) 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    debugger
    return (<div>
        {loginStatus && 
        <nav class="navbar navbar-expand-lg bg-body-transparent sticky-top">
  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
                 <Link className='nav-link' to='/home'>
                   Home
                 </Link>
        </li>

        <li class="nav-item">
                 <Link className='nav-link' to='/pastOrders'>
                   Past Orders
                 </Link>
        </li>
       
        
      </ul>
     
      <div class="d-flex">
      
      <button class="btn btn-danger" onClick={()=>{

                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('email')
                    dispatch(logout())
                    navigate("/login") 
                    

      }} >Log Out</button>
    
      </div>
     
    </div>
  </div>
</nav>
        }
        </div>
       )
}
export default Nav;