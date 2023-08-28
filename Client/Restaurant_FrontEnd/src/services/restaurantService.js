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

export const getRestaurantProfile=async(emailId,token)=>{
  const url = createUrl(`/restaurant/${emailId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const updateReataurant= async(
  resId,
  token,
  restaurantName,
  cuisine,
  email,
  password,
  mobileNumber,
  fssai,
  streetAddressLine1,
  streetAddressLine2,
  city,
  state,
  postalCode,
  country
  )=>{ 
  debugger;
  const url = createUrl(`/restaurant/${resId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  }
  const body = {
    restaurantName,
    cuisine,
    email,
    password,
    mobileNumber,
    fssai,
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
   const response =  await axios.put(url,body,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}
export const addRestaurantImage= async(resId,token,formData)=>{
  const urlImage= createUrl(`/restaurant/restaurantImage/${resId}`)  
   const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }
  const body = {
        formData
  }
  try{
    debugger
    const response =  await axios.post(urlImage,formData,{headers})

     log(response.data)
     
     return response
  }catch(ex) {
    debugger
    log(ex)
    return null
  }
 }
 export const updateRestaurantPassword= async(token,oldPassword,newPassword)=>{ 
  debugger;
  const url = createUrl(`/restaurant/password`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  }
  const body = {
    oldPassword,
    newPassword
}
try{
   const response =  await axios.put(url,body,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getPendingOrder =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/orderByRestaurant/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}
export const getPastOrder =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/pastOrderByRestaurant/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getMenuByRestaurantId =async(resId,token)=>{ 

  const url = createUrl(`/restaurant/menubyResId/${resId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
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

export const removeMenu=async(menuId,token)=>{
  const url = createUrl(`/restaurant/menu/${menuId}`)  
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

export const updateMenu= async(
  menuId,
  token,
  name,
    menuType,
    category,
    price
  )=>{ 
  debugger;
  const url = createUrl(`/restaurant/menu/${menuId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  }
  const body = {
    name,
    menuType,
    category,
    price
}
try{
   const response =  await axios.put(url,body,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const confirmOrder=async(orderId,token)=>{ 
  const url = createUrl(`/restaurant/confirmOrder/${orderId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
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
 export const cancelOrder=async(orderId,token)=>{ 
  const url = createUrl(`/restaurant/cancelOrder/${orderId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
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
 

 export const getOrderReadyForPickup=async(orderId,token)=>{ 
  const url = createUrl(`/restaurant/orderReadyForPickup/${orderId}`)  
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
export const signUpRestaurant =async (
        restaurantName,
        cuisine,
        email,
        password,
        mobileNumber,
        fssai,
        streetAddressLine1,
        streetAddressLine2,
        city,
        state,
        postalCode,
        country
)=>{ 
  const url = createUrl(`/restaurant`)  
  const body = {
    restaurantName,
    cuisine,
    email,
    password,
    mobileNumber,
    fssai,
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
  return null
}
}

export const addMenu = async(
  resId,
  token,
  name,
  menuType,
  category,
  price
  )=>{ 
  const url = createUrl(`/restaurant/addmenu/${resId}`)  
  const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  }
  const body = {
        name,
        menuType,
        category,
        price
  }
  
try{
  debugger
   const response =  await axios.post(url,body,{headers})
   log(response.data)
   
   return response
}catch(ex) {
  debugger
  log(ex)
  return null
}
 }

 export const addMenuImage= async(menuId,token,formData)=>{
  const urlImage= createUrl(`/restaurant/menuImage/${menuId}`)  
   const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }
  const body = {
        formData
  }
  try{
    debugger
    const response =  await axios.post(urlImage,formData,{headers})

     log(response.data)
     
     return response
  }catch(ex) {
    debugger
    log(ex)
    return null
  }
 }





 export const getMenu=async(menuId,token)=>{
  const url = createUrl(`/restaurant/menu/${menuId}`)  
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

export const getOrderMenuItems=async(orderId,token)=>{
  debugger
  const url = createUrl(`/restaurant/orderMenuItems/${orderId}`)  
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

export const getPendingOrderCount =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/pendingOrderCount/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getDeliveredOrderCount =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/deliveredOrderCount/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getTotalOrderCount =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/totalOrderCount/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getTotalEarnings =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/totalEarnings/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}

export const getEarningsPerOrder =async(resId,token)=>{ 
  const url = createUrl(`/restaurant/earningsPerOrder/${resId}`)  
  const headers = {
  //  "Content-Type": "application/json",
    Authorization: token==""? '':`Bearer ${token}`,
  };
try{
   const response =  await axios.get(url,{headers})
   log(response.data)
   return response
}catch(ex) {
  log(ex)
  return null
}
}