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
import PastOrders from './components/PastOrders'
import Profile from './components/Profile'

function App() {
  const dispatch = useDispatch()
  const toggle = useSelector((state)=>state.toggle.status)

  useEffect(()=>{
    if(sessionStorage.token != undefined )
    {
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
            <Route path="/profile" exact element={<ProtectedRoute component={Profile}/>}></Route>
            <Route path="/pastOrders" exact element={<ProtectedRoute component={PastOrders}/>}></Route>
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
