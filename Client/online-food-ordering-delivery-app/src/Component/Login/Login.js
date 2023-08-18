import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap-icons/bootstrap-icons.svg"
import "../../../node_modules/bootstrap-icons/icons/search.svg"



function Login() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [cred, setCred] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const history = useHistory();


    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(0);
        }, 2000);
    }, [message])

    const validateData = () => {
    }

    const textChange = (args) => {
        var copy = { ...cred };
        copy[args.target.name] = args.target.value;
        setCred(copy);
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }} >
                <div style={{ backgroundImage: "url('http://127.0.0.1:3000/assets/LoginImage.jpg')", width: "50%", height: "100vh", backgroundSize: 'cover', backgroundRepeat: 'no-repeat',boxShadow : "1px 3px 4px black"}} >
                </div>
                <div style={{marginTop : "20vh" , width:"70vh",height:"50vh",display : "flex" , alignItems : "center",marginLeft : "25vh", justifyContent : "center",boxShadow : "1px 2px 9px #F4AAB9"}}>
                    <div className="row" style={{ flexDirection: "column",width:"50vh",alignItems : "center" }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            {
                                displayMsgBox !== 0 ?
                                    <div className="form-floating mb-3">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                            }
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={cred.email} onChange={textChange} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={cred.password} onChange={textChange} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                        </div>
                        
                        <button type="button" className="btn btn-primary" style={{ width: "12vh" }} onClick={validateData}><Link to='/login' style={{ color: "white", textDecoration: "none" }}>Login</Link></button>
                        <i class="bi bi-search"></i>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login; 