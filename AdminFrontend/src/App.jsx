import React, { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import Restaurants from './components/Restaurants'
import ApproveRestaurant from './components/ApproveReaustarant'
import ApproveDeliveryBoy from './components/ApproveDeliveryBoy'
import DeliveryBoy from './components/DeliveryBoy'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from './features/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import { setToken } from './features/tokenSlice'
import { setToggle } from './features/toggleSlice'

function App() {
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>state.toggle.status)

  useEffect(()=>{
    if(sessionStorage.token != undefined )
    {
    //  dispatch(setToggle())
      dispatch(setToken(sessionStorage.token))
      dispatch(login())   
    } 
  },[])

  return (
    <div className='container-fluid .bg-transparent min-vh-100 ' style={{backgroundColor: 'brown'}}>
      <div className='row'>
        {toggle &&
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar/>
          </div>
        }
        {toggle &&
          <div className='col-4 col-md-2'>
          </div>
        }
        <div className='col'>
        <div className='px-3' style={{backgroundColor:"brown"}}>
           <Nav />
          
            <Routes>
            <Route path="/users" exact element={<ProtectedRoute component={Users}/>}></Route>
            <Route path="/reaustarants" exact element={<ProtectedRoute component={Restaurants}/>}></Route>
            <Route path="/approvereaustarant" exact element={<ProtectedRoute component={ApproveRestaurant}/>}></Route>
            <Route path="/approvedeliveryboy" exact element={<ProtectedRoute component={ApproveDeliveryBoy}/>}></Route>
            <Route path="/deliveryboys" exact element={<ProtectedRoute component={DeliveryBoy}/>}></Route>
            <Route path="/home" exact element={<ProtectedRoute component={Home}/>}></Route>
            
            <Route path="/*" Component={Login}></Route>
            </Routes>
          </div>
          <ToastContainer />

        </div>
      </div>
    </div>)
}
export default App;

