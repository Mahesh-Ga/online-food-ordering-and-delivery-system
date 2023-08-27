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
  price,
  formData
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
   const urlImage= createUrl(`/restaurant/menuImage/${response.data.id}`)  
   const headersImage = {
    Authorization: token==""? '':`Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }
  const bodyImage = {
        formData
  }
  const newResponse =  await axios.post(urlImage,bodyImage,{headersImage})
  
   log(newResponse.data)
   return {status:200}
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