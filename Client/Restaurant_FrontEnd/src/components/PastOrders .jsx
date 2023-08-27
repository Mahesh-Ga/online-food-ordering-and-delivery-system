import React, { useEffect, useState } from 'react'
import '../style.css'
import { useSelector } from 'react-redux';
import {  getOrderMenuItems, getPastOrder} from '../services/restaurantService';
import { log } from '../utils/util';


function PastOrders() {
  const [pastOrder,setPastOrder]=useState([])
  
  const token = useSelector((state)=>state.token.tokenValue)
  const resId=useSelector((state)=>state.restaurant.id)
  const [itemList,setItemList]=useState([])

  useEffect(()=>{
    if(token!="")
    loadData();
  
  },[token])

  const loadData = async() => {
    debugger
    const response=await getPastOrder(resId,token)
    if(response != null && response.status == 200) {
      debugger;
      setPastOrder(response.data);  
      log(response.data)
    }
    else{
      debugger;
    }}

    const getOrderItemList = async(orderId) => {
      const response=await getOrderMenuItems(orderId,token)
      if(response != null && response.status == 200) {
        debugger;
        setItemList(response.data);  
        log(response.data)
      }
      else{
        debugger;
      }}
  return (
    <div className='container-fluid'>
      <table className="table caption-top  rounded mt-2" style={{backgroundColor:"navajowhite"}}>
        <caption className='text-black fs-4'>Past Orders</caption>
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Order Date Time</th>
            <th scope="col">Order Status</th> 
            <th scope="col">Order Price</th>
            <th scope="col">Order Items</th>

          </tr>
        </thead>
        <tbody>
        
          {
          pastOrder.map((c)=>{
            return <> <tr>
            <th scope="row">{c['orderId']}</th>
            <td>{c['orderTimestamp']}</td>
            <td>{c['status']}</td>
            <td>{c['totalPrice']}</td>
           <td>
           <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>{getOrderItemList(c['orderId'])}}>
  Items List
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Go Back</button>
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
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

export default PastOrders;
export const ApproveDeliveryBoy=()=>{};