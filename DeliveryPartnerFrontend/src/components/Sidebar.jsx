import React from 'react'
import '../style.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { setToggle } from '../features/toggleSlice';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='bg-white sidebar p-2' > 
            <div className='m-2'>
        
                <span className='brand-name fs-4'>
                    Welcome
                </span>
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush'>
                <a className='list-group-item py-2' onClick={()=>{navigate('/home')}} >
                    <i className='bi bi-table fs-5 me-3'>
                    </i>
                    <span >
                        Dashboard
                    </span>
                </a>
                
                {/* <a className='list-group-item py-2' onClick={()=>{navigate('/users');}}>
                    <i className='bi bi-people fs-5 me-3'>

                    </i>
                    <span >Customers</span>
                </a> */}
                
                {/* <a className='list-group-item py-2' onClick={()=>{navigate('/reaustarants')}} >
                    <i className='bi-r-square-fill fs-5 me-3'>
                    </i>
                    <span >Reaustarants</span>
                </a>
               
                <a className='list-group-item py-2' onClick={()=>{navigate('/deliveryboys')}}>
                    <i className='bi bi-people fs-5 me-3'>
                    </i>
                    <span >Orders</span>
                </a> */}
               
                <a className='list-group-item py-2' onClick={()=>{navigate('/pastOrders')}} > 
                    <i className='bi bi-check-square fs-5 me-3'>
                    </i>
                    <span >Past Orders</span>
                </a>

   
                <a className='list-group-item py-2' onClick={()=>{navigate('/profile')}}>
                    <i className='bi bi-person-add fs-5 me-3'>
                    </i>
                    <span >Profile</span>
                </a>
            


                <a className='list-group-item py-2' onClick={()=>{
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('email')
                    dispatch(setToggle())
                    dispatch(logout())
                    }} >
                    <i className='bi bi-power fs-5 me-3'>

                    </i>
                    <span >
                        Logout
                    </span>
                </a>
            </div>
        </div>
    )
}
export default Sidebar;