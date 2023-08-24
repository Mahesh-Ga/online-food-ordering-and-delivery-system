import axios from "axios";
import { createUrl, log } from '../utils/util';


export const pendingRestaurants = async(token) =>{
  
  const url = createUrl('/admin/pending/restaurant')  
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
export const approveRestaurant = async(id,token)=>{
  
  const url = createUrl(`/admin/approve/restaurant/${id}`)  
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
export const rejectRestaurant = async(id,token)=>{ 
  
  const url = createUrl(`/admin/restaurant/${id}`)  
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


export const getAllActiveRestaurants = async (token)=>{ 
  const url = createUrl('/admin/restaurant')
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

export const removeRestaurant = async(id,token)=>{ 

  const url = createUrl(`/admin/remove/restaurant/${id}`)  
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
