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
    log(ex)
    return null
  }
  }