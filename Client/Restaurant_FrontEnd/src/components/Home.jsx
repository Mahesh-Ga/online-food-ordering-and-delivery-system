import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { addRestaurantImage, getAllActiveRestaurants, getDeliveredOrderCount, getEarningsPerOrder, getPendingOrderCount, getRestaurantImage, getRestaurantProfile, getTotalEarnings, getTotalOrderCount, updateReataurant, updateRestaurantPassword } from '../services/restaurantService';
import { toast } from 'react-toastify';
import CountUp from './Counter';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { removeToken } from '../features/tokenSlice';
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from '../features/toggleSlice';
function Home() {

  
  
    const [restaurant,setRestaurant]  = useState([])
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [countOfPendingOrders, setCountOfPendingOrders] = useState('')
    const [countOfDeliveredOrders, setCountOfDeliveredOrders] = useState('')
    const [countOfTotalOrders, setCountOfTotalOrders] = useState('')
    const [totalEarnings, setTotalEarnings] = useState('')
    const [earningsPerOrder, setEarningsPerOrder] = useState('')
    const [oldPassword,setOldPassword] = useState('')
    const [resImage,setResImage]=useState(null)
     const navigate=useNavigate();
     const dispatch = useDispatch();


  

    const token = useSelector((state)=>state.token.tokenValue)
    const resId=useSelector((state)=>state.restaurant.id)
    useEffect(() => {
    
      debugger
    }, []);
    
    useEffect(()=>{
      if(token!="")
      loadData(resId);
    
    },[token,resId])
  
    const loadData = async(resId) => {
  
      const response = await getRestaurantProfile(sessionStorage['email'],token)
      debugger  
      if(response != null && response.status == 200) {
          debugger;
          setRestaurant(response.data);  
          setRestaurantName(response.data.restaurantName)
          setCuisine(response.data.cuisine)
          setEmail(response.data.user.email)
         
          setMobileNumber(response.data.mobileNumber)
          setFssai(response.data.fssai)
          setStreetAddressLine1(response.data.address.streetAddressLine1)
          setStreetAddressLine2(response.data.address.streetAddressLine2)
          setCity(response.data.address.city)
          setState(response.data.address.state)
          setPostalCode(response.data.address.postalCode)
          setCountry(response.data.address.country)
          setResImage(`https://localhost:7070/restaurant/restaurantImage/${resId}`)
        }
        else{
          debugger;
        }

        //  const getMyRestaurantImage=await getRestaurantImage(resId,token)
        //  debugger
        //  if(getMyRestaurantImage != null && getMyRestaurantImage.status == 201) {
        //   debugger;
        //  setResImage(getMyRestaurantImage.data);

        // }
        // else{
        //   debugger;
        // }

        const CountPendingOrder = await getPendingOrderCount(resId,token)
        debugger  
        if(CountPendingOrder != null && CountPendingOrder.status == 200) {
            debugger;
           setCountOfPendingOrders(CountPendingOrder.data.orderCount);
  
          }
          else{
            debugger;
          }
          const CountDeliveredOrder = await getDeliveredOrderCount(resId,token)
        debugger  
        if(CountDeliveredOrder != null && CountDeliveredOrder.status == 200) {
            debugger;
           setCountOfDeliveredOrders(CountDeliveredOrder.data.orderCount);
  
          }
          else{
            debugger;
          }

          const CountTotalOrder = await getTotalOrderCount(resId,token)
          debugger  
          if(CountTotalOrder != null && CountTotalOrder.status == 200) {
              debugger;
             setCountOfTotalOrders(CountTotalOrder.data.orderCount);
    
            }
            else{
              debugger;
            }

            const responseTotalEarnings = await getTotalEarnings(resId,token)
          debugger  
          if(responseTotalEarnings != null && responseTotalEarnings.status == 200) {
              debugger;
             setTotalEarnings(responseTotalEarnings.data.orderPrice);
    
            }
            else{
              debugger;
            }
            const responseEarningsPerOrder = await getEarningsPerOrder(resId,token)
            debugger  
            if(responseEarningsPerOrder != null && responseEarningsPerOrder.status == 200) {
                debugger;
               setEarningsPerOrder(responseEarningsPerOrder.data.orderPrice);
      
              }
              else{
                debugger;
              }

    }
    const changePassword =async() => {
      debugger
      if (oldPassword.length == '') {
        toast.error('Please enter old password')
      } else if (password.length == '') {
        toast.error('Please enter new password')
      } else if (confirmPassword.length == '') {
        toast.error('Please enter confirm password')
      } else if (password !== confirmPassword) {
        toast.error('Password does not match')
      } else {
        // call register api
        const response = await updateRestaurantPassword(
          token,
          oldPassword,
          password
        )
      debugger
        // parse the response
        if (response != null && response['status'] == 200) {
          toast.success('Successfully changed your password')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('email')
          dispatch(logout())
          dispatch(removeToken())
          dispatch(setToggle())
          setOldPassword("")
          setPassword("")
          setConfirmPassword("")
          
           navigate('/')
        } else {
          toast.error('Error while changing your password, please try again')
          setOldPassword("")
          setPassword("")
          setConfirmPassword("")
        }
      }
    }
    const updateRes =async(resId) => {
      debugger
      if (restaurantName.length == '') {
        toast.error('Please enter Restaurant name')
      }  else if (email.length == '') {
        toast.error('Please enter email')
      } else if (mobileNumber.length == '') {
        toast.error('Please enter mobile')
      } else if (cuisine.length =='') {
        toast.error('Cusine Type not selected')
      } else {
        // call register api
        const response = await updateReataurant(
          resId,
          token,
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
          toast.success('Successfully updated your Restaurant')
          sessionStorage['email']=email;
          
          loadData();
        } else {
          toast.error('Error while updating your  Restaurant, please try again')
        }
      }
    }

    const addImage= async(resId)=>{
      debugger
      const formData = new FormData();
    formData.append('imageFile', selectedFile);
    const response=await addRestaurantImage(resId,token,formData)
    debugger
    // parse the response
    if (response != null && response['status'] == 201) {
      loadData();
      setSelectedFile(null);
      toast.success('Successfully addded a Restaurant Image')
      setResImage(`https://localhost:7070/restaurant/restaurantImage/${resId}`)
      
      
    } else {
      toast.error('Error while adding a Restaurant Image, please try again')
      setSelectedFile(null);
    }
    }
      
    return (
        <div className='container-fluid' style={{backgroundColor :'whitesmoke' }} >
            <div className='row g-3 my-2'>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'><CountUp number={countOfPendingOrders}></CountUp></h3>
                            <p className='fs-5'>Pending Orders</p>
                        </div>
                        <h2><i class="material-icons">local_dining</i></h2>
                        {/* <i className='bi bi-buildings p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'   style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'><CountUp number={countOfDeliveredOrders}></CountUp></h3>
                            <p className='fs-5'>Orderes delivered</p>
                        </div>
                        <h2><i class="fas fa-biking"></i></h2>
                        {/* <i className='bi bi-currency-dollar p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'><CountUp number={countOfTotalOrders}></CountUp></h3>
                            <p className='fs-5'>Total Orders </p>
                        </div>
                        <h2> <i class="fas fa-calendar-day"></i> </h2>

                        {/* <i className='bi bi-truck p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'><CountUp number={totalEarnings}></CountUp> </h3>
                            <p className='fs-5'>Total Earnigs</p>
                        </div>
                        <h2><i class="bi bi-currency-rupee"></i></h2>
                        {/* <i className='bi bi-graph-up-arrow p-3 fs-1'></i> */}
                    </div>
                </div>
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'><CountUp number={earningsPerOrder}></CountUp> </h3>
                            <p className='fs-5'>Earnigs Per Order</p>
                        </div>
                        <h2><i class="bi bi-currency-rupee"></i></h2>
                        {/* <i className='bi bi-graph-up-arrow p-3 fs-1'></i> */}
                    </div>
                </div>
            </div>

            
            
            <div >
      <h1 style={{ textAlign: 'center', margin: 20 }}>Restaurant Info</h1>
      <div className='row' style={{ marginTop: 50 }}>
      <div className='col-md-3'>
            <img  className='col-md-12'
                src={`https://localhost:7070/restaurant/restaurantImage/${restaurant['id']}`}
                // src={resImage}
                  style={{ height: 200 }}
                  alt=''
                />
            </div>
            <div className='col-md-9'>
              <div className='card'>
             
            
            
                <div className='card-body' style={{backgroundColor :'navajowhite',borderBlockColor:"navajowhite" }}>
                  <h5 className='card-title'>Restaurant Name: {restaurant['restaurantName']}</h5>
                  <div className='card-text'>
                    <div>Cusine Type : {restaurant['cuisine']}</div>
                    <div>Fsaai No.: {restaurant['fssai']}</div>
                    <div>Contact: {restaurant['mobileNumber']}</div>
                    <div>Address: {streetAddressLine1},{streetAddressLine2},{city},{state},{country},{postalCode}.</div>

                    <div>
                      
                
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>loadData()}>
  Update My Profile
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Your Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className='row' >
        <div className='col'></div>
        <div className='col' style={{backgroundColor:'plum'}}>
       
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Restaurant Name</label>
              <input
              value={restaurantName}
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
              value={email}
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
              value={mobileNumber}
                type='tel'
                className='form-control'
                onChange={(e) => {
                  setMobileNumber(e.target.value)
                }}
              />
            </div>

            {/* <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
              value={}
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
            </div> */}
            <div className='mb-3'>
              <label htmlFor=''>FSSAI No.</label>
              <input
              value={fssai}
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
              value={streetAddressLine1}
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
              value={streetAddressLine2}
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
              value={city}
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
              value={state}
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
              value={postalCode}
                type='text'
                className='form-control'
                onChange={(e) => {
                  setPostalCode(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Country</label>
              <input
              value={country}
                type='text'
                className='form-control'
                onChange={(e) => {
                  setCountry(e.target.value)
                }}
              />
            </div>


            {/* <div className='mb-3'>
             
               
              <button onClick={()=>{updateRes()}} className='btn btn-success' style={{backgroundColor:'brown'}}>
                Register
              </button>
            </div> */}
          </div>
        </div>
        <div className='col'></div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{updateRes(resId)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>
&nbsp;&nbsp;


<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalImage" >
  Add Restaurant Image
</button>


<div class="modal fade" id="exampleModalImage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalImageLabel">Add Restaurant Image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div className='mb-3'>
              <label htmlFor=''>Restaurant Image</label>
              <input
              //  value={selectedFile}
                type='file'
                className='form-control'
                onChange={(e) => {
                  setSelectedFile(e.target.files[0])
                }}
              />
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{addImage(resId)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>

&nbsp;&nbsp;
<button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModalcp">
  Change Password
</button>


<div class="modal fade" id="exampleModalcp" tabindex="-1" aria-labelledby="exampleModalLabelcp" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelcp">Change Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='mb-3'>
              <label htmlFor=''>Old Password</label>
              <input
              value={oldPassword}
                type='password'
                className='form-control'
                onChange={(e) => {
                  setOldPassword(e.target.value)
                }}
              />
            </div>
      <div className='mb-3'>
              <label htmlFor=''>New Password</label>
              <input
               value={password}
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm New Password</label>
              <input
               value={confirmPassword}
                type='password'
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{changePassword()}}>Save changes</button>
      </div>
    </div>
  </div>
</div>


                      
                    </div>
                  </div>
                  
                </div>
               
              </div>
            </div>
           
         
      </div>
    </div>
        </div>

    )
}

export default Home;