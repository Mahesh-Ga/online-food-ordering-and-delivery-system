import React from 'react'
import '../style.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { setToggle } from '../features/toggleSlice';
import { removeRestaurant } from '../features/restaurantSlice';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='bg-white sidebar p-2'  > 
            <div className='m-2'>
        
                <span className='brand-name fs-4' >
                    Welcome
                </span>
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush' >
                <a className='list-group-item py-2' onClick={()=>{navigate('/Home')}} >
                    <i className='bi bi-table fs-5 me-3'>
                    </i>
                    <span >
                        Dashboard
                    </span>
                </a>
                <a className='list-group-item py-2' onClick={()=>{navigate('/currentOrders');}}>
           <i class="bi bi-cart fs-5 me-3"></i>
                <span >Current Orders</span>
            </a>
            <a className='list-group-item py-2' onClick={()=>{navigate('/pastOrders')}} >
                <i className='bi bi-cart-check-fill fs-5 me-3'>
                </i>
                <span >Past orders</span>
            </a>
           
            <a className='list-group-item py-2' onClick={()=>{navigate('/menu')}}>
                <i className='bi bi-menu-button fs-5 me-3'>
                </i>
                <span >View Menu</span>
            </a>
                <a className='list-group-item py-2' onClick={()=>{
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('email')
                    sessionStorage.removeItem('resId')

                    dispatch(removeRestaurant())
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