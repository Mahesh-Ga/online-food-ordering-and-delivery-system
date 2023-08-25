import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login } from "../features/authSlice"
import { signIn } from "../services/loginService"
import { setToken } from "../features/tokenSlice"
import { setToggle } from "../features/toggleSlice"

function Login(){

  debugger
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate()
  
    const dispatch = useDispatch();


    const loginUser = async () => {
      debugger
      if (email.length == '') {
        toast.error('Please enter email')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else {
        const response = await signIn(email,password);
        
        debugger;
        if (response != null && response['status'] == 200) {
        const { jwt } = response['data']
  
           sessionStorage['token'] = jwt
           sessionStorage['email'] = email
       debugger
         dispatch(login())
         dispatch(setToken(jwt))
         debugger
        toast.success(`Welcome ${email} to online food ordering and delivery application`)
          dispatch(setToggle())
          navigate('/home')

        } else {
          toast.error('Invalid user name or password')
        }
      }
    }
  

    return <>
        <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Welcome To Admin Page</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <button onClick={loginUser} className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
    
    </>
}

export default Login