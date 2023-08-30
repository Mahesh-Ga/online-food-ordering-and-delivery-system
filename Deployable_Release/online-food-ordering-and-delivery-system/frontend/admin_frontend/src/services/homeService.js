import axios from "axios";
import { createUrl, log } from '../utils/util';


export const totalRestaurantCount = async(token) =>{
  
  const url = createUrl('/admin/restaurant/count')  
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


export const getTotalSale = async(token) =>{
  
    const url = createUrl('/admin/orders/totalSale')  
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
  export const totalOrdersDelivered = async(token) =>{
  
    const url = createUrl('/admin/orders/delivered')  
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
    


  export const percentageChangeInSale = async(token) =>{
  
    const url = createUrl('/admin/growth')  
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
