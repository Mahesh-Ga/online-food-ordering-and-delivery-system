import React, { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import { setToken } from './features/tokenSlice'
import CurrentOrders from './components/CurrentOrders'

import Menu from './components/Menu'
import PastOrders from './components/PastOrders '


import RegisterRestaurant from './components/Register'
import AddMenu from './components/addMenu'
import { setRestaurant } from './features/restaurantSlice'


function App() {
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>state.toggle.status)

  
  useEffect(()=>{
    if(sessionStorage.token != undefined )
    {
      dispatch(setToken(sessionStorage.token))
      dispatch(login())   
      dispatch(setRestaurant({id:sessionStorage.resId}))
    } 
  },[])

  return (
    <div className='container-fluid .bg-transparent min-vh-100 ' style={{ backgroundColor:"whitesmoke"}}>
    {/* // backgroundImage : `url("http://localhost:3000/Images/restaurantLogin.jpg")`}}> */}
      <div className='row' >
        {toggle &&
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar/>
          </div>
        }
        {toggle &&
          <div className='col-4 col-md-2'>
          </div>
        }
        <div className='col' style={{ backgroundColor:"whitesmoke" }}>
        <div className='px-3' style={{ backgroundColor: 'whitesmoke' }} >
           <Nav />
          
            <Routes>
            <Route path="/currentOrders" exact element={<ProtectedRoute component={CurrentOrders}/>}></Route>
            <Route path="/pastOrders" exact element={<ProtectedRoute component={PastOrders}/>}></Route>
            <Route path="/menu" exact element={<ProtectedRoute component={Menu}/>}></Route>
            <Route path="/addmenu" exact element={<ProtectedRoute component={AddMenu}/>}></Route>

            <Route path="/home" exact element={<ProtectedRoute component={Home}/>}></Route>
           
            <Route path="/register" Component={RegisterRestaurant}></Route>

            <Route path="/*" Component={Login}></Route>
           
            </Routes>
          </div>
          <ToastContainer />

        </div>
      </div>
    </div>)
}
export default App;

