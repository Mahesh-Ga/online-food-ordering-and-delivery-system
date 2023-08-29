import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signUpRestaurant } from '../services/restaurantService'


function RegisterRestaurant() {
  const [restaurantName, setRestaurantName] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fssai, setFssai] = useState('')
  const [streetAddressLine1, setStreetAddressLine1] = useState('')
  const [streetAddressLine2, setStreetAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  const registerRes = async () => {
    debugger
    if (restaurantName.length == '') {
      toast.error('Please enter Restaurant name')
    }  else if (email.length == '') {
      toast.error('Please enter email')
    } else if (mobileNumber.length == '') {
      toast.error('Please enter mobile')
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else if (confirmPassword.length == '') {
      toast.error('Please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('Password does not match')
    }else if (cuisine.length =='') {
      toast.error('Cusine Type not selected')
    } else {
      // call register api
      const response = await signUpRestaurant(
        restaurantName,
        cuisine,
        email,
        password,
        mobileNumber,
        fssai,
        streetAddressLine1,
        streetAddressLine2,
        city,
        state,
        postalCode,
        country
      )
    debugger
      // parse the response
      if (response != null && response['status'] == 200) {
        toast.success('Successfully registered a new Restaurant')

        // go back to login
        navigate('/')
      } else {
        toast.error('Error while registering a new Restaurant, please try again')
      }
    }
  }

  return (
    
    <div className='mb-3 row' style={{backgroundImage : `url("http://localhost:3000/Images/register1.jpg")`}}>
      
    
     
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register Your Restaurant</h1>

      <div className='row' >
        <div className='col'></div>
        <div className='col' style={{backgroundColor:'plum'}}>
       
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Restaurant Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setRestaurantName(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
            <label htmlFor=''>Cusine</label> 
           
            <select class="form-select" aria-label="Default select example"
             value={cuisine}
             onChange={(e) => setCuisine(e.target.value)}
             >
            <option selected>Select the Cusine </option>
            <option value="INDIAN">INDIAN</option>
            <option value="CHINESE">CHINESE</option>
            <option value="ITALIAN">ITALIAN</option>
            <option value="JAPANESE">JAPANESE</option>
            <option value="MEXICAN">MEXICAN</option>
            <option value="THAI">THAI</option>
            
</select>
          </div>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setMobileNumber(e.target.value)
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
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>FSSAI No.</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setFssai(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>StreetAddressLine1</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setStreetAddressLine1(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>StreetAddressLine2</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setStreetAddressLine2(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>City</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>State</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setState(e.target.value)
                }}
              />
            </div>
             <div className='mb-3'>
              <label htmlFor=''>Postal Code</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setPostalCode(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Country</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setCountry(e.target.value)
                }}
              />
            </div>


            <div className='mb-3'>
              <div className='mb-3'>
                Already have an account? <Link to='/'>Login here</Link>
              </div>
              <button onClick={()=>{registerRes()}} className='btn btn-success' style={{backgroundColor:'brown'}}>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterRestaurant