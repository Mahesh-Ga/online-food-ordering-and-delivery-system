import axios from "axios"
import appForAdmin from "../httpCommon"


export const signIn = async(email,password)=>{ 
  debugger
    const body = {
        email,
        password
    } 
    return await axios.post(`https://localhost:7070/user/signin`,body)
}

// export const validateUser = async()=>{
//     return await appForAdmin.get(`/admin/restaurant`)

// }

// later change to validate api 
// export const signOut = ()=>{
//     return app
// }
