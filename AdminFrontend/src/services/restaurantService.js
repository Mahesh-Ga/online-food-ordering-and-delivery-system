import axios from "axios";
import appForAdmin from "../httpCommon";
import DeliveryBoys from '../components/DeliveryBoy';
import { useSelector } from "react-redux";



export const pendingRestaurants = async() =>{ return await appForAdmin.get(`/admin/pending/restaurant`)}
export const approveRestaurant = async(id)=>{  return await appForAdmin.put(`/admin/approve/restaurant/${id}`)}
export const rejectRestaurant = async(id)=>{ return await appForAdmin.delete(`/admin/restaurant/${id}`)}

export const getAllActiveRestaurants = async (token)=>{ 

    const headers = {
    Authorization: token==""? '':`Bearer ${token}`,
  };
    debugger
        return await axios.get('https://localhost:7070/admin/restaurant', { headers })

}

export const removeRestaurant = async(id)=>{ return await appForAdmin.put(`/admin/remove/restaurant/${id}`)}
