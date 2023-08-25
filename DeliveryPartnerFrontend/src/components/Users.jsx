import { toast } from 'react-toastify';
import { getAllActiveRestaurants, removeRestaurant } from '../services/restaurantService';
import '../style.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


function Users() {

  const [restaurants, setRestaurant] = useState([])

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
    if(response != null && response.status == 200) {
        debugger;
        setRestaurant(response.data);  
      }
      else{
        debugger;
      }
  }


  const remove = async(id) => {
   const response = await removeRestaurant(id,token)
      if(response != null && response.status ==200) {
       toast.success("successfully removed")
        loadData();
      }
      else {
        toast.error("failed to remove")
      }

  }

  return (<>
    <div class="accordion" id="accordionExample">
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
                    <button type="button" className="btn btn-danger" onClick={() => { remove(restaurant.id) }}>Remove</button>
                  </div>

                </form>
              </div>
            </div>
          </div>

        })
      }

    </div>
  </>

  )





}

export default Users;
