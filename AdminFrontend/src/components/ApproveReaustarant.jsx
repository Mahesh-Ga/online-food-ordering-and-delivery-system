import React, { useEffect, useState } from 'react'
import '../style.css'
import { approveRestaurant, pendingRestaurants, rejectRestaurant } from '../services/restaurantService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ApproveRestaurant() {

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
    const response =  await pendingRestaurants()
      if(response.status == 200) {
        setRestaurant(response.data);
        debugger;
      }else{
        debugger;
      }
  }

  const approve = async(id) => {
    const response = await approveRestaurant(id)
      if(response.status == 200){
        toast.success('successfully approved')
        loadData();
      }else {
        toast.error('failed to approved')
        debugger
      }
  }

  const reject = async(id) => {
   const response = await rejectRestaurant(id)
      if(response.status ==200){
        toast.success('successfully rejected')
        loadData();
      }else{
        toast.error('failed to reject')
        debugger
      };
  }

  return (<div>
     <h2 style={{ textAlign: 'center' }}>Approve Restaurants</h2>
     <br></br>
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
                    <input type="email" className="form-control" id="email" value={restaurant.user.email} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label for="mobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" id="mobile" value={restaurant.mobileNumber} readOnly />
                  </div>
              
                  <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">cuisine</label>
                    <input type="text" className="form-control" id="inputEmail4" value={restaurant.cuisine}/>
                  </div>

                  <div className="col-md-6">
                    <label for="inputPassword4" className="form-label">fssai</label>
                    <input type="text" className="form-control" id="inputPassword4" value={restaurant.fssai} />
                  </div>
                  
                  <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" value={restaurant.address.streetAddressLine1} />
                  </div>

                  <div className="col-12">
                    <label for="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" value={restaurant.address.streetAddressLine2} />
                  </div>

                  <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" value={restaurant.address.city}/>
                  </div>


                  <div className="col-md-4">
                    <label for="inputState" className="form-label">State</label>
                    <input type='text' id="inputState" className="form-control" value={restaurant.address.state}/>
                  </div>

                  <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" value={restaurant.address.postalCode} />
                  </div>

                  <div className="col-md-6">
                    <button type="button" className="btn btn-success" onClick={() => { approve(restaurant.id) }}>Approve</button>
                  </div>

                  <div className="col-md-6">
                    <button type="button" className="btn btn-danger" onClick={() => { reject(restaurant.id) }}>Reject</button>
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

export default ApproveRestaurant;