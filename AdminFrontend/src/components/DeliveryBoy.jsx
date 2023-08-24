import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import {getAllActiveRestaurants} from '../services/restaurantService'
import { useSelector } from 'react-redux'
function DeliveryBoys() {



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
    <div className="accordion" id="accordionExample">
  
    {
      restaurants.map((restaurant)=>{
  
       return     <div className="accordion-item" key={restaurant.id}>
       <h2 className="accordion-header">
         <button className="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target={"#" + restaurant.id} 
          aria-expanded="false" aria-controls={restaurant.id}>
           {restaurant.name}
         </button>
       </h2>
       
       <div id={restaurant.id} className="accordion-collapse collapse" 
        data-bs-parent="#accordionExample">
        <div className="accordion-body">
         
         
         <form className="row g-3">
    
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4"/>
            </div>
    
    <div className="col-md-6">
      <label for="inputPassword4" className="form-label">Password</label>
      <input type="password" className="form-control" id="inputPassword4"/>
    </div>
    
    <div className="col-12">
      <label for="inputAddress" className="form-label">Address</label>
      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
    </div>
    
    <div className="col-12">
      <label for="inputAddress2" className="form-label">Address 2</label>
      <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
    </div>
    
    <div className="col-md-6">
      <label for="inputCity" className="form-label">City</label>
      <input type="text" className="form-control" id="inputCity"/>
    </div>
    
    
    <div className="col-md-4">
      <label for="inputState" className="form-label">State</label>
      <select id="inputState" className="form-select">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    
    <div className="col-md-2">
      <label for="inputZip" className="form-label">Zip</label>
      <input type="text" className="form-control" id="inputZip"/>
    </div>
    
  </form>
  
         </div>
       </div>
     </div>
       
      })
    }
  
  </div>
  )
}

export default DeliveryBoys;