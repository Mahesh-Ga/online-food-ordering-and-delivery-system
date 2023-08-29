import React, { useEffect, useState } from 'react'
import '../style.css'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { approveDeliveryPartner, pendingDeliveryPartners, rejectDeliveryPartner } from '../services/deliveryService';

function ApproveDeliveryBoy() {

  const [deliveryPartners, setDeliveryPartners] = useState([])

  const token = useSelector((state)=>state.token.tokenValue)

  useEffect(() => {
  
    debugger
  }, []);
  
  useEffect(()=>{
    if(token!="")
    loadData();
  
  },[token])


  const loadData = async() => {

    const response =  await pendingDeliveryPartners(token)
      if(response != null && response.status == 200) {
        setDeliveryPartners(response.data);

        debugger;
      }else{
        debugger;
      }
  }

  const approve = async(id) => {

    const response = await approveDeliveryPartner(id,token)
      if(response != null && response.status == 200){

        toast.success('successfully approved')
        loadData();
      }else {
        toast.error('failed to approved')
        debugger
      }
  }

  const reject = async(id) => {

   const response = await rejectDeliveryPartner(id,token)
      if(response != null && response.status ==200){

        toast.success('successfully rejected')
        loadData();
      }else{
        toast.error('failed to reject')
        debugger
      };
  }

  return (<>
   <h2 style={{ textAlign: 'center' }}>Approve Delivery Partners</h2>
     <br></br>
  
    <div className="accordion" id="accordionExample">

      {
        deliveryPartners.map((deliveryPartner) => {

          return <div className="accordion-item" key={deliveryPartner.id}>
            
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target={"#" + deliveryPartner.id}
                aria-expanded="false" aria-controls={deliveryPartner.id}>
                {deliveryPartner.firstName +" "+ deliveryPartner.lastName}
              </button>
            </h2>

            <div id={deliveryPartner.id} className="accordion-collapse collapse"
              data-bs-parent="#accordionExample">
              <div className="accordion-body">

                <form className="row g-3">

                  <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">email</label>
                    <input type="text" className="form-control" id="inputEmail4" value={deliveryPartner.user.email}/>
                  </div>

                  <div className="col-md-6">
                    <label for="inputMobile4" className="form-label">mobile</label>
                    <input type="text" className="form-control" id="inputMobile4" value={deliveryPartner.mobile_no} />
                  </div>
                  
                  <div className="col-md-6">
                    <label for="inputVehicle4" className="form-label">vehicle No</label>
                    <input type="text" className="form-control" id="inputVehicle4" value={deliveryPartner.vehicleNumber} />
                  </div>
                  
                  <div className="col-md-6">
                    <label for="inputLicense4" className="form-label">Driving License</label>
                    <input type="text" className="form-control" id="inputLicense4" value={deliveryPartner.drivingLicense} />
                  </div>
                  
                  <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" value={deliveryPartner.address.streetAddressLine1} />
                  </div>

                  <div className="col-12">
                    <label for="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" value={deliveryPartner.address.streetAddressLine2} />
                  </div>

                  <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" value={deliveryPartner.address.city}/>
                  </div>


                  <div className="col-md-4">
                    <label for="inputState" className="form-label">State</label>
                    <input type='text' id="inputState" className="form-control" value={deliveryPartner.address.state}/>
                  </div>

                  <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" value={deliveryPartner.address.postalCode} />
                  </div>

                  <div className="col-md-6">
                    <button type="button" className="btn btn-success" onClick={() => { approve(deliveryPartner.id) }}>Approve</button>
                  </div>

                  <div className="col-md-6">
                    <button type="button" className="btn btn-danger" onClick={() => { reject(deliveryPartner.id) }}>Reject</button>
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

export default ApproveDeliveryBoy;