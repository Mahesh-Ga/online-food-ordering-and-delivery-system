import axios from "axios";
import { createUrl, log } from '../utils/util';


export const pendingOrders = async(token) =>{
  
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

export const acceptOrder = async(id,token)=>{
  
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

export const registerDeliveryPartner = async(body)=>{ 

  const url = createUrl(`/delivery`)
try{
   const response =  await axios.post(url,{body})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}



