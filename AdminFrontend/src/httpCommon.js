import axios from "axios";


const getToken = ()=>{
  debugger
  if(sessionStorage.getItem('token')==null || sessionStorage.getItem('token')==undefined)
  return "";
  else
    return 'Bearer ' +sessionStorage.getItem('token');
}

const appForAdmin=axios.create({
    baseURL: 'https://localhost:7070/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':  getToken(),
    },
  });


  export default appForAdmin;