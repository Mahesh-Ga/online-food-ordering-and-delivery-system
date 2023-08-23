import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { getAllActiveRestaurants } from '../services/restaurantService';
import { useSelector } from 'react-redux';
function Home() {

    const [restaurants,setRestaurant]  = useState([])

    const token = useSelector((state)=>state.token.tokenValue)

    useEffect(() => {
    
      debugger
    }, []);
    
    useEffect(()=>{
      if(token!="")
      loadData();
    
    },[token])
  
    const loadData = async() => {
  
      const response = await getAllActiveRestaurants(token)
      debugger  
      if(response.status == 200) {
          debugger;
          setRestaurant(response.data);  
        }
        else{
          debugger;
        }
    }
  
      
    return (
        <div className='container-fluid' >
            <div className='row g-3 my-2'>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>230</h3>
                            <p className='fs-5'>Restaurants</p>
                        </div>
                        <i className='bi bi-buildings p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>2450</h3>
                            <p className='fs-5'>Sales</p>
                        </div>
                        <i className='bi bi-currency-dollar p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>2250</h3>
                            <p className='fs-5'>Delivery</p>
                        </div>
                        <i className='bi bi-truck p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>20%</h3>
                            <p className='fs-5'>Increase</p>
                        </div>
                        <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                    </div>
                </div>
            </div>
            
            <div className="accordion" id="accordionExample">
            {
        restaurants.map((restaurant) => {

          return <div className="accordion-item" key={restaurant.id}>
            
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target={"#" + restaurant.id}
                aria-expanded="false" aria-controls={restaurant.id}>
                {restaurant.restaurantName}
              </button>
            </h2>

            <div id={restaurant.id} className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">

                <form className="row g-3">

                  <div className="col-md-6">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={restaurant.email} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label for="mobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" id="mobile" value={restaurant.mobileNumber} readOnly />
                  </div>
                 <div className="col-md-6">
                    <label for="cuisine" className="form-label">Cuisine</label>
                    <input type="text" className="form-control" id="cuisine" value={restaurant.cuisine} readOnly />
                  </div>


                  <div className="col-md-6">
                    <label for="fssai" className="form-label">Fssai</label>
                    <input type="text" className="form-control" id="fssai" value={restaurant.fssai} readOnly />
                  </div>

                  <div className="col-12">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={restaurant.address.streetAddressLine1} readOnly />
                  </div>

                  <div className="col-12">
                    <label for="address2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="address2" value={restaurant.address.streetAddressLine2} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label for="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={restaurant.address.city} readOnly />
                  </div>


                  <div className="col-md-4">
                    <label for="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" value={restaurant.address.state} readOnly />
                  </div>


                  <div className="col-md-2">
                    <label for="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" value={restaurant.address.postalCode} readOnly />
                  </div>


                  <div className="col-md-6">
                    <button type="button" className="btn btn-danger" onClick={() => { }}>Remove</button>
                  </div>

                </form>
              </div>
            </div>
          </div>

        })
      }


</div>
        </div>

    )
}

export default Home;