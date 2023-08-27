import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { getAllActiveRestaurants, getRestaurantProfile } from '../services/restaurantService';
import { useSelector } from 'react-redux';
function Home() {

    const [restaurant,setRestaurant]  = useState([])

    const token = useSelector((state)=>state.token.tokenValue)

    useEffect(() => {
    
      debugger
    }, []);
    
    useEffect(()=>{
      if(token!="")
      loadData();
    
    },[token])
  
    const loadData = async() => {
  
      const response = await getRestaurantProfile(sessionStorage['email'],token)
      debugger  
      if(response != null && response.status == 200) {
          debugger;
          setRestaurant(response.data);  
        }
        else{
          debugger;
        }
    }
  
      
    return (
        <div className='container-fluid' style={{backgroundColor :'whitesmoke' }} >
            <div className='row g-3 my-2'>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'>2</h3>
                            <p className='fs-5'>Pending Orders</p>
                        </div>
                        <h2><i class="material-icons">local_dining</i></h2>
                        {/* <i className='bi bi-buildings p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1' >
                    <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'   style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'>3</h3>
                            <p className='fs-5'>Orderes delivered Today</p>
                        </div>
                        <h2><i class="fas fa-biking"></i></h2>
                        {/* <i className='bi bi-currency-dollar p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'>22</h3>
                            <p className='fs-5'>Total Orders (Monthly)</p>
                        </div>
                        <h2> <i class="fas fa-calendar-day"></i> </h2>

                        {/* <i className='bi bi-truck p-3 fs-1'></i> */}
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded'  style={{backgroundColor:"navajowhite"}}>
                        <div>
                            <h3 className='fs-2'>2000</h3>
                            <p className='fs-5'>Total Earnigs (Monthly)</p>
                        </div>
                        <h2><i class="bi bi-currency-rupee"></i></h2>
                        {/* <i className='bi bi-graph-up-arrow p-3 fs-1'></i> */}
                    </div>
                </div>
            </div>
            
            <div >
      <h1 style={{ textAlign: 'center', margin: 20 }}>Restaurant Info</h1>
      <div className='row' style={{ marginTop: 50 }}>
        
            <div className='col-md-12'>
              <div className='card'>
                <img
               src={`https://localhost:7070/restaurant/restaurantImage/${restaurant['id']}`}

                  style={{ height: 200 }}
                  alt=''
                />
                <div className='card-body' style={{backgroundColor :'navajowhite',borderBlockColor:"navajowhite" }}>
                  <h5 className='card-title'>{restaurant['restaurantName']}</h5>
                  <div className='card-text'>
                    <div>{restaurant['cuisine']}</div>
                    <div> {restaurant['fssai']}</div>
                    <div> {restaurant['mobileNumber']}</div>

                    <div>
                      
                     
                      
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