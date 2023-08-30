import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux';
import {  getOrderMenuItems, getPastOrders } from '../services/deliveryService';



function PastOrders(){

    const [currentOrder,setCurrentOrder]=useState([])
    const [itemList,setItemList]=useState([])
  
    const token = useSelector((state)=>state.token.tokenValue)
  
      
      useEffect(()=>{
        if(token!="")
        loadData();    
      },[token])
    
  
      const loadData = async() => {
    
        const response = await getPastOrders(token)
        debugger  
        if(response != null && response.status == 200) {
            debugger;
            setCurrentOrder(response.data);
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
  
  
  


    return <div> 


        <div className='container-fluid' >
                        <div className='container-fluid' >
      <table className="table caption-top  rounded mt-2" >
        <caption className='text-black fs-4'>Past Orders</caption>
        <thead >
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Order Date&Time</th>
            <th scope="col">Order Status</th>
            <th scope="col">Order Price</th>
          
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
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" 
            onClick={()=>{getOrderItems(c['orderId'])}}>
                     Order Details
              </button>

<div class="modal fade" id="exampleModal" tabindex="-1" 
role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            
        
          </tr></>           
          })
          }
        </tbody>
      </table>
    </div>

    

</div>


















    </div>









}

export default PastOrders