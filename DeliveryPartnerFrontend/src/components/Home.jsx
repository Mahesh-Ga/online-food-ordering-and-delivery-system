import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux';
import { pendingOrders } from '../services/deliveryService';
function Home() {

    const [orders,setOrders]  = useState([])

    const token = useSelector((state)=>state.token.tokenValue)

    useEffect(() => {
    
      debugger
    }, []);
    
    useEffect(()=>{
      if(token!="")
      loadData();
    
    },[token])
  
    const loadData = async() => {
  
      const response = await pendingOrders(token)
      debugger  
      if(response != null && response.status == 200) {
          debugger;
          setOrders(response.data);  
        }
        else{
          debugger;
        }
        
    }
  
      
    return (
        <div className='container-fluid' >
            <div className='row g-3 my-2'>
                
                <div className='col-md-4 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>₹ 2450</h3>
                            <p className='fs-5'>Earning</p>
                        </div>
                        <i className='bi bi-currency-dollar p-3 fs-1'></i>

                    </div>
                </div>
                
                <div className='col-md-4 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>2250</h3>
                            <p className='fs-5'>Delivery's</p>
                        </div>
                        <i className='bi bi-truck p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-4 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>20%</h3>
                            <p className='fs-5'>Increase</p>
                        </div>
                        <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                    </div>
                </div>
            </div>


              {/* <div className="accordion" id="accordionExample">
       {
      orders.map((order)=>{
  
       return     <div className="accordion-item" key={order.id}>
       <h2 className="accordion-header">
         <button className="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target={"#" + order.id} 
          aria-expanded="false" aria-controls={order.id}>
           {order.name}
         </button>
       </h2>
       
       <div id={order.id} className="accordion-collapse collapse" 
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
  
  </div> */}






</div>

    )
}

export default Home;