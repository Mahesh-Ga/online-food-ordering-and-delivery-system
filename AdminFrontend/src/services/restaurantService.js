import appForAdmin from "../httpCommon";

export const pendingRestaurants = () =>{ return appForAdmin.get(`/admin/pending/restaurant`)}
export const approveRestaurant = (id)=>{  return appForAdmin.put(`/admin/approve/restaurant/${id}`)}
export const rejectRestaurant = (id)=>{ return appForAdmin.delete(`/admin/restaurant/${id}`)}
export const getAllActiveRestaurants = ()=>{ return appForAdmin.get('/admin/restaurant')}
export const removeRestaurant = (id)=>{ return appForAdmin.put(`/admin/remove/restaurant/${id}`)}
