import React, { useEffect, useState } from 'react'
import '../style.css'
import { useSelector } from 'react-redux';
import { cancelOrder, confirmOrder, getOrderMenuItems, getOrderReadyForPickup, getPendingOrder} from '../services/restaurantService';
import { log } from '../utils/util';


function CurrentOrders() {
  const [currentOrder,setCurrentOrder]=useState([])
  const [itemList,setItemList]=useState([])
  
  const token = useSelector((state)=>state.token.tokenValue)
  const resId=useSelector((state)=>state.restaurant.id)
  useEffect(()=>{
    if(token!="")
    loadData();
  
  },[token])

  const loadData = async() => {
    const response=await getPendingOrder(resId,token)
    if(response != null && response.status == 200) {
      debugger;
      setCurrentOrder(response.data);  
      log(response.data)
    }
    else{
      debugger;
    }}
   
  const getOrderItems = async(orderId) => {
      debugger
      const response=await getOrderMenuItems(orderId,token)
      if(response != null && response.status == 200) {
        debugger;
        setItemList(response.data);  
        log(response.data)
      }
      else{
        debugger;
      }}
const accept=async(orderId,token)=>{
  debugger
 
  const response=await confirmOrder(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    loadData();
    log(response.data)
  }
  else{
    debugger;
  }
}
const ready=async(orderId,token)=>{
  debugger
 
  const response=await getOrderReadyForPickup(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    loadData();
    log(response.data)
  }
  else{
    debugger;
  }
}
const cancel=async(orderId,token)=>{
  debugger
 
  const response=await cancelOrder(orderId,token)
  if(response != null && response.status == 200) {
    debugger;
    loadData();
    log(response.data)
  }
  else{
    debugger;
  }
}

  return (
    <div className='container-fluid' >
      <table className="table caption-top  rounded mt-2" >
        <caption className='text-black fs-4'>Current Orders</caption>
        <thead >
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Order Date Time</th>
            <th scope="col">Order Status</th>
            <th scope="col">Order Price</th>
            <th scope="col">Accept</th>
            <th scope="col">Ready</th>
            <th scope="col">Decline</th>
            <th scope="col">Order Items</th>
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
            <button type="button" class="btn btn-success" onClick={()=>{accept(c['orderId'],token)}}
             disabled={c['status'] == 'CONFIRMED' || c['status'] == 'READY_FOR_PICKUP'}>Confirm</button>
            </td>
            <td>
            <button type="button" class="btn btn-info" onClick={()=>{ready(c['orderId'],token)}}
            disabled={c['status'] == 'PENDING' || c['status'] == 'READY_FOR_PICKUP'}>Ready To Pickup</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger" onClick={()=>{cancel(c['orderId'],token)}}
            disabled={c['status'] == 'CONFIRMED' || c['status'] == 'READY_FOR_PICKUP'} >Decline</button>
            </td>
            <td>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>{getOrderItems(c['orderId'])}}>
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
              Menu Name
            </th>
            <th>
              Quantity
            </th>
            <th>&nbsp;
              Price per Unit
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
          <button type="button" class="btn btn-primary"  data-dismiss="modal">Go Back</button>

      </div>
    </div>
  </div>
</div>
            </td>
          </tr></>
           
          })

          }
        </tbody>
      </table>
    </div>

  )
        }

export default CurrentOrders;
export const ApproveDeliveryBoy=()=>{};