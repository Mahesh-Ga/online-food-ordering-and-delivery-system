import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux';
import { confirmOrder, getCurrentOrderToBeDelivered, getOrderMenuItems, getPendingOrders, getCustomer, getRestaurant, changeStatusToOutForDelivery, cancelOrder, orderDelivered } from '../services/deliveryService';
import { toast } from 'react-toastify';
import { log } from '../utils/util';


function Home() {

  const [currentOrder,setCurrentOrder]=useState([])
  const [itemList,setItemList]=useState([])

  const [customer,setCustomer] = useState({
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "mobile_no": "string",
    "addrList": [
      {
        "streetAddressLine1": "string",
        "streetAddressLine2": "string",
        "state": "string",
        "city": "string",
        "postalCode": "string",
        "country": "string"
      }
    ]
  })
  const [restaurant, setRestaurant] = useState({
    "id": 0,
    "restaurantName": "string",
    "cuisine": "INDIAN",
    "mobileNumber": "string",
    "fssai": "string",
    "address": {
      "streetAddressLine1": "string",
      "streetAddressLine2": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    }
   
  })

  const [flag,SetFlag]=useState(false)

  const token = useSelector((state)=>state.token.tokenValue)

    
    useEffect(()=>{
      if(token!="")
      loadCurrentOrderToBeDelivered();    
    },[token])
  

    const loadData = async() => {
  
      const response = await getPendingOrders(token)
      debugger  
      if(response != null && response.status == 200) {
          debugger;
          setCurrentOrder(response.data);
        }
        else{
          debugger;
        }
        
    }

    const getCurrentCustomer = async(id)=>{
      debugger
      const response=await getCustomer(id,token)
      if(response != null && response.status == 200) {
        debugger;
        setCustomer(response.data);  
        log(response.data)
      }
      else{
        debugger;
      }
    }

    const getCurrentRestaurant = async(id)=>{
      debugger
      const response = await getRestaurant(id,token)
      if(response != null && response.status == 200) {
        setRestaurant(response.data)    
        debugger
          }
          else{
            debugger
          }

    }

    const loadCurrentOrderToBeDelivered = async() =>{

    const response = await getCurrentOrderToBeDelivered(token)
      debugger  
      if(response != null && response.status == 200) {
          debugger;
          if(response.data == null || response.data.length ==0 ){
            SetFlag(true)
            loadData()
          }
          else{
            if(response.data.length != 0){
            getOrderItems(response.data[0].orderId)
             getCurrentCustomer(response.data[0].orderId)
             getCurrentRestaurant(response.data[0].orderId)
            setCurrentOrder(response.data);
            }  
          } 
        }
        else{
          debugger;
        }
    }
  
  
    const getOrderItems = async(orderId) => {
      debugger
      const response=await getOrderMenuItems(orderId,token)
      if(response != null && response.status == 200) {
        debugger;
        setItemList(response.data);  
      }
      else{
        debugger;
      }
    }


const accept=async(orderId)=>{
  debugger
 
  const response=await confirmOrder(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    loadData();
    log(response.data)
    toast.success("Accept successful!!!!")
    SetFlag(false)
    loadCurrentOrderToBeDelivered();
  }
  else{
    debugger;
  }
}

const cancel=async (orderId)=>{
  debugger
 
  const response=await cancelOrder(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    log(response.data)
    toast.success("canceled successfully!!!!")
    loadCurrentOrderToBeDelivered();
  }
  else{
    debugger;
  }
}

const delivered =async (orderId)=>{
  debugger
 
  const response=await orderDelivered(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    log(response.data)
    toast.success("delivery successfully!!!!")
    loadCurrentOrderToBeDelivered();
  }
  else{
    debugger;
  }
}

const outForDelivery=async(orderId)=>{
  debugger
 
  const response=await changeStatusToOutForDelivery(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    log(response.data)
    toast.success("updated successfully!!!!")
    loadCurrentOrderToBeDelivered();
  }
  else{
    debugger;
  }
}


    return (
        <div className='container-fluid' >
            

      {flag &&
            <div className='container-fluid' >
      <table className="table caption-top  rounded mt-2" >
        <caption className='text-black fs-4'>Current Orders</caption>
        <thead >
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Order Date&Time</th>
            <th scope="col">Order Status</th>
            <th scope="col">Order Price</th>
          
            <th scope="col">Order Items</th>
            <th scope="col">Accept</th>
        
          </tr>
        </thead>
  
        <tbody>
        
          {
          currentOrder.map((c)=>{
            return <> <tr>
            <th scope="row">{c['orderId']}</th>
            <td>{c['orderTimestamp']}</td>
            <td>{c['status']}</td>
            <td>{c['totalPrice']}</td>
           
             
            <td>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" 
            onClick={()=>{getOrderItems(c['orderId'])}}>
                     Menu List
              </button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Menu List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <table>
          <tr>
            <th>
              Name
            </th>
            <th>
              Qty
            </th>
            <th>&nbsp;
              Price
            </th>
          </tr>
        {
          
          itemList.map(c=>{
            return <>
            <tr>
      <td>{c.menuName}</td>
      <td>&nbsp;&nbsp;{c.quantity}</td>
      <td>&nbsp;&nbsp;{c.priceAtOrder}</td>
            </tr>
            
            
            </>
          }
            
            )
        }
       </table>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>
            </td>
            <td>
            <button type="button" class="btn btn-success" onClick={()=>{accept(c['orderId'])}}>
              Confirm</button>
            </td>
        
          </tr></>           
          })
          }
        </tbody>
      </table>
    </div>
        }

{ !flag &&
            <div className='container-fluid' >
          {
          currentOrder.map((c)=>{
            return <> 
      
<div class="card">

  <h3 class="card-header">Current Order to be Delivered</h3>
  <div class="card-body">

 <div className='row'>

 <div className='col-md-3'>
 <h6 class="card-title">Restaurant Name :</h6>
 </div>
 
 <div className='col-md-9'>
 <h6 class="card-title">{restaurant.restaurantName}</h6>
 </div>

 <div className='col-md-3'>
 <h6 >Restaurant Address : </h6>

</div>

<div className='col-md-9'>
<h6 >{restaurant.address.streetAddressLine1+" , "+restaurant.address.streetAddressLine2+" , "+restaurant.address.city+"."}</h6>

</div>
<div className='col-md-3'>
<h6 >Order Id :</h6>
  
</div>
<div className='col-md-9'>
<h6 > {c['orderId']}</h6>
  
</div>
<div className='col-md-3'>
<h6 >Order Time :</h6>
  
</div>
<div className='col-md-9'>
<h6 > {c['orderTimestamp']}</h6>
  
</div>
<div className='col-md-3'>
<h6 >Order Status : </h6>
   
</div>
<div className='col-md-9'>
<h6 >{c['status']} </h6>
   
</div>
<div className='col-md-3'>
<h6 >Customer Name :</h6>
   
</div>

<div className='col-md-9'>
<h6 >{customer.firstName +" "+customer.lastName}</h6>
   
</div>

<div className='col-md-3'>
<h6 >Customer Mobile</h6>
   
</div>

<div className='col-md-9'>
<h6 >{customer.mobile_no}</h6>
   
</div>

<div className='col-md-3'>
<h6 >Customer Address :</h6>
   
</div>

<div className='col-md-9'>
<h6 >{customer.addrList[0].streetAddressLine1 + " , "+customer.addrList[0].streetAddressLine2+" , "+customer.addrList[0].city +"."}</h6>
   
</div>

 </div>
   
        <div class="table-responsive">
          <table class="table table-primary">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
                <th scope="col">Total</th>
              </tr>

            </thead>
            <tbody>
            
          {
            itemList.map(i =>{
              return   <tr>
                     <td>{i.menuName}</td>
                      <td>{i.quantity}</td>
                    <td>{i.priceAtOrder}</td>
                    <td>{i.quantity * i.priceAtOrder}</td>
                    
            </tr>
            })
          }
            </tbody>
          </table>
        </div>
        <h5 >Order Total : {c['totalPrice']}</h5>
    <br></br>
    <div className='row'>
{ c['status'] == "READY_FOR_PICKUP" || c['status'] == "CONFIRMED" &&
<div className='col-2'>
  
<button type="button" class="btn btn-primary" onClick={()=>{
                              outForDelivery(c['orderId'])
                                }}>
                  Out For Delivery
    </button>

</div>
          }

{  c['status'] == "OUT_FOR_DELIVERY" &&          
<div className='col-2'>
<button type="button" class="btn btn-danger" onClick={()=>{
cancel(c['orderId'])
}} >
                  Cancel
              </button>

</div>
          }
 {  c['status'] == "OUT_FOR_DELIVERY" && 
<div className='col-2'>
<button type="button" class="btn btn-success" onClick={()=>{
   delivered(c['orderId'])
}}>
                Delivered
              </button>

</div>
          }
          
    </div>

</div>
</div>

             </>
           
          })
          }
    </div>
  }

</div>

    )
}

export default Home;