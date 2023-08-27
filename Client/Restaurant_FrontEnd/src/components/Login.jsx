import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login } from "../features/authSlice"
import { signIn } from "../services/loginService"
import { setToken } from "../features/tokenSlice"
import { setToggle } from "../features/toggleSlice"
import { setRestaurant } from "../features/restaurantSlice"
import { getRestaurantProfile } from "../services/restaurantService"

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
function Login(){


  
    
  debugger
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate()
  
    const dispatch = useDispatch();
   
    

    const loginUser = async () => {
      debugger
      if (email.length == '') {
        toast.error('Please enter email')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else {
        const response = await signIn(email,password);
        
        debugger;
        if (response != null && response['status'] == 200) {
        const { jwt } = response['data']
  
           sessionStorage['token'] = jwt
           sessionStorage['email'] = email
       debugger
         dispatch(login())
         dispatch(setToken(jwt))
         debugger
        toast.success(`Welcome ${email} to online food ordering and delivery application`)
          dispatch(setToggle())
          
          const restaurant=  await getRestaurantProfile(email,jwt)       
            restaurant.data.email=sessionStorage['email'];
            console.log(restaurant);
            dispatch(setRestaurant(restaurant.data))
            debugger
          navigate('/home')

        } else {
          toast.error('Invalid user name or password')
        }
      }
    }
  

    return <>
        <div >
      <h1 style={{ textAlign: 'center', margin: 40 }}>Welcome To Restaurant Login</h1>
     
      
     
      {/* <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div> */}
    </div>

    <div>
    <MDBContainer className='my-5' >
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='5'>
            <MDBCardImage src="http://localhost:3000/Images/login1.jpg" alt='RestaurantImage' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>
          <MDBCol md='5'>

            <MDBCardBody>

              {/* <MDBInput wrapperClass='mb-3' label='Email address' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-3' label='Password' id='form2' type='password'/>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100">Sign in</MDBBtn> */}
 <div className='row' >
       
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
           
          </div>
        </div>
       
      </div>
            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
    </div>
    
    </>
}

export default Login