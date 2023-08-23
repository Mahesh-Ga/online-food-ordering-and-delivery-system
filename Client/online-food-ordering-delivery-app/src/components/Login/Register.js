import { useEffect, useState } from "react";
import Footer from "../Styling/Footer";
import Header from "../Styling/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerUser } from "../../services/user";
import { log } from "../../utilities/utils";

function Register() {
    const [displayMsgBox, setDisplayMsgBox] = useState(false);
    const [cred, setCred] = useState({ firstName : "", lastName : "", email: "", password: "" ,confirmPassword : "" ,mobile : ""});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(false);
        }, 2000);
    }, [message])

    const uploadData = async () => {
        if(cred.password === cred.confirmPassword){
            const response = await registerUser(
                cred.firstName,
                cred.lastName,
                cred.email,
                cred.password,
                cred.mobile
              )
              
            if(response.message) {
                toast.success(response.message)
            } else {
                toast.error(response.split("'")[1] + " already exists")
            }
        log(response)

        }
        else{
          toast.error("Password doesn't match")
        }
    }

    const textChange = (args) => {
        var copy = { ...cred };
        copy[args.target.name] = args.target.value;
        setCred(copy);
    }
    
    return (
    <>
            <div className="container" style={{ marginTop: "10vh" }}>
               <h4 style={{textAlign: "center", marginBottom:"2.5vh"}}>REGISTRATION</h4> 
                <div className="row  d-flex justify-content-center" style={{ flexDirection: "column", alignItems: "center" }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {
                            displayMsgBox &&
                                <div className="form-floating mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                        }
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingFirst" placeholder="FirstName" name="firstName" value={cred.firstName} onChange={textChange} />
                            <label htmlFor="floatingFirst">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingLast" placeholder="LastName" name="lastName" value={cred.lastName} onChange={textChange} />
                            <label htmlFor="floatingLast">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={cred.email} onChange={textChange} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingMobile" placeholder="Password" name="mobile" value={cred.mobile} onChange={textChange} />
                            <label htmlFor="floatingMobile">Mobile No.</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={cred.password} onChange={textChange} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Password" name="confirmPassword" value={cred.confirmPassword} onChange={textChange} />
                            <label htmlFor="floatingConfirmPassword"> Confirm Password</label>
                        </div>
                    </div>
                    Already have an acoount ?<div style={{textAlign : "center"}}> <Link to='/'>Login here ... </Link></div>
                    <button type="button" className="btn btn-primary" style={{ width: "12vh",marginTop : "3vh"}} onClick={uploadData}>Register</button>
                </div>
            </div>
    </>);
}

export default Register;
