import axios from "axios";
import { createUrl, log } from '../utils/util';


export const getPendingOrders = async(token) =>{
  
  const url = createUrl('/delivery/orders')  
    const headers = {
      Authorization: token==""? '':`Bearer ${token}`,
    };
  try{
    debugger
     const response =  await axios.get(url,{headers})
     log(response.data)
     return response
  }catch(ex) {
    log(ex)
    return null
  }

}

export const confirmOrder = async(id,token)=>{
  
  const url = createUrl(`/delivery/accept/${id}`)  
  const headers = {
    'Content-Type': 'application/json',   
    Authorization: token==""? '':'Bearer '+token,
  };
try{
  debugger
   const response =  await axios.put(url,{},{headers})
   log(response.data)
   return response
}catch(ex) {
debugger
  log(ex)
  return null
}
}

export const orderDelivered = async(id,token)=>{ 
  
  const url = createUrl(`/delivery/delivered/${id}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.put(url,{},{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const changeStatusToOutForDelivery= async(id,token)=>{ 
  
  const url = createUrl(`/delivery/outfordelivery/${id}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
  debugger
   const response =  await axios.put(url,{},{headers})
   log(response.data)
   return response
}catch(ex) {
  debugger
  log(ex)
  return null
}
}

export const getCurrentOrderToBeDelivered = async(token)=>{
  const url = createUrl('/delivery/currentOrder')  
    const headers = {
      Authorization: token==""? '':`Bearer ${token}`,
    };
  try{
    debugger
     const response =  await axios.get(url,{headers})
     log(response.data)
     return response
  }catch(ex) {
    log(ex)
    return null
  }
  
} 

export const getPastOrders = async(token)=>{
  const url = createUrl('/delivery/pastOrders')  
    const headers = {
      Authorization: token==""? '':`Bearer ${token}`,
    };
  try{
    debugger
     const response =  await axios.get(url,{headers})
     log(response.data)
     return response
  }catch(ex) {
    log(ex)
    return null
  }
  
} 

export const cancelOrder = async (id,token)=>{ 
  const url = createUrl(`/delivery/cancelled/${id}`)
    const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };

  try {
    const response = await axios.put(url,{}, { headers })
    log(response.data)
    return response
  } catch (ex) {
    log(ex)
    return null
  }
}

export const getCustomer = async (id,token)=>{ 
  const url = createUrl(`/delivery/customer/${id}`)
    const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };

  try {
    const response = await axios.get(url, { headers })
    log(response.data)
    return response
  } catch (ex) {
    log(ex)
    return null
  }
}
export const getRestaurant = async (id,token)=>{ 
  const url = createUrl(`/delivery/restaurant/${id}`)
    const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };

  try {
    const response = await axios.get(url, { headers })
    log(response.data)
    return response
  } catch (ex) {
    log(ex)
    return null
  }
}

export const getOrderMenuItems=async(orderId,token)=>{
  debugger
  const url = createUrl(`/delivery/orderMenuItems/${orderId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  }
try{
  debugger
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  debugger
  log(ex)
  return null
}
}



export const signUpDeliveryPartner =async (
  firstName,
  lastName,
  mobile_no,
  vehicleNumber,
  drivingLicense,
  earnings,
  email,
  password,
  streetAddressLine1,
  streetAddressLine2,
  city,
  state,
  postalCode,
  country
)=>{ 
const url = createUrl(`/delivery`)  
const body = {
  firstName,
  lastName,
  mobile_no,
  vehicleNumber,
  drivingLicense,
  earnings,

  email,
  password,
  address :{
  streetAddressLine1,
  streetAddressLine2,
  city,
  state,
  postalCode,
  country
  }
}
try{
debugger
const response =  await axios.post(url,body)
log(response.data)
return response
}catch(ex) {
debugger
log(ex)
return ex.response
}
}
