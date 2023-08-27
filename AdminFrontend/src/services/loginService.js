import axios from "axios"
import appForAdmin from "../httpCommon"


export const signIn = async(email,password)=>{ 
  debugger
    const body = {
        email,
        password
    } 

  try{
     const response =  await axios.post(url,body)
     log(response.data)
     return response
  }catch(ex) {
    log(ex)
    return null
  }

  }


