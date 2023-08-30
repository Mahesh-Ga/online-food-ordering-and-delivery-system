import axios from "axios"
import { createUrl, log } from "../utils/util";


export const signIn = async(email,password)=>{ 
  debugger

  const url = createUrl(`/user/signin`);  
    
  const body = {
        email,
        password
    } 
  try{
     const response =  await axios.post(url,body)
     log(response.data)
     return response
  }catch(ex) {
    debugger
    log(ex)
    return null
  }

  }

// export const validateUser = async()=>{
//     return await appForAdmin.get(`/admin/restaurant`)

// }

// later change to validate api 
// export const signOut = ()=>{
//     return app
// }
