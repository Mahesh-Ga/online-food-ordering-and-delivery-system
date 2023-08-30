import axios from "axios";
import { createUrl, log } from '../utils/util';


export const pendingDeliveryPartners = async(token) =>{
  
  const url = createUrl('/admin/pending/deliverypartner')  
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
export const approveDeliveryPartner = async(id,token)=>{
  
  const url = createUrl(`/admin/approve/deliverypartner/${id}`)  
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
export const rejectDeliveryPartner = async(id,token)=>{ 
  
  const url = createUrl(`/admin/deliverypartner/${id}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.delete(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}


export const getAllActiveDeliveryPartner = async (token)=>{ 
  const url = createUrl('/admin/deliverypartner')
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

export const removeDeliveryPartner = async(id,token)=>{ 

  const url = createUrl(`/admin/remove/deliverypartner/${id}`)  
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



