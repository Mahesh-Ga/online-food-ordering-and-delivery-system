import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpDeliveryPartner } from '../services/deliveryService';

function Register() {

  
  const [cred, setCred] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "mobile_no": "",
    "vehicleNumber": "",
    "drivingLicense": "",
    "earnings": 0,
      "streetAddressLine1": "",
      "streetAddressLine2": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": ""
    
  
  });
  
  
  const navigate = useNavigate();


  const uploadData = async () => {
    
    if (!cred.firstName) {
        toast.error('First name is required.');
      }
      else if (!cred.lastName) {
        toast.error('Last name is required.');
      }
      else if (!cred.email) {
        toast.error('Email is required.');
      } else if (!/\S+@\S+\.\S+/.test(cred.email)) {
        toast.error('Invalid email format.');
      }
     
      else if (!cred.password) {
        toast.error('Password is required.');
      } else if (cred.password.length < 8) {
        toast.error('Password must be at least 8 characters.');
      }
      else if(cred.password != cred.confirmPassword){
        toast.error("password doesn't match.")
      }
 
      else if (!cred.mobile_no) {
        toast.error('Mobile number is required.');
      } else if (!/^\d{10}$/.test(cred.mobile_no)) {
        toast.error( 'Invalid mobile number.');
      }
      else if (!cred.vehicleNumber) {
        toast.error('Vehicle number is required.');
      }
      else if (!cred.drivingLicense) {
        toast.error('Driving license is required.');
      }
      else if (!cred.streetAddressLine1) {
        toast.error('Street address is required.');
      }
      else if (!cred.city) {
        toast.error('City is required.');
      }
      else if (!cred.state) {
        toast.error('State is required.');
      }
      else if (!cred.postalCode) {
        toast.error('Postal code is required.');
      }
      else if (!cred.country) {
        toast.error('Country is required.');
      }
      else{

        const response = await signUpDeliveryPartner(
        cred.firstName,
        cred.lastName,
        cred.mobileNumber,
        cred.vehicleNumber,
        cred.drivingLicense,
        cred.earnings,
        cred.email,
        cred. password,
        cred.streetAddressLine1,
        cred.streetAddressLine2,
        cred.city,
        cred.state,
        cred.postalCode,
        cred.country);
        
        if(response != null && response.status ==200){
           debugger
            toast.success("successfully Registered")
            navigate("/")
        }
        else if(response != null){
            debugger
            toast.error(response.data)
        }
        else{
            debugger
            toast.error("something went wrong!!")
        }
      }


  }
  const textChange = (args) => {
    var copy = { ...cred };
    copy[args.target.name] = args.target.value;
    setCred(copy);
  };

  return (
    <>
      <div className="container" style={{ marginTop: "10vh" }}>
        <h4 style={{ textAlign: "center", marginBottom: "2.5vh" }}>
          REGISTRATION
        </h4>
        <div
          className="row  d-flex justify-content-center"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingFirst"
                placeholder="FirstName"
                name="firstName"
                value={cred.firstName}
                onChange={textChange}
              />
              <label htmlFor="floatingFirst">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingLast"
                placeholder="LastName"
                name="lastName"
                value={cred.lastName}
                onChange={textChange}
              />
              <label htmlFor="floatingLast">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={cred.email}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingMobile"
                placeholder="Password"
                name="mobile_no"
                value={cred.mobile_no}
                onChange={textChange}
              />
              <label htmlFor="floatingMobile">Mobile No.</label>
            </div>
    
        
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="MH12AB5252"
                name="vehicleNumber"
                value={cred.vehicleNumber}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">Vehicle Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="ABCD1234"
                name="drivingLicense"
                value={cred.drivingLicense}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">Driving License</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="address line 1"
                name="streetAddressLine1"
                value={cred.streetAddressLine1}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">StreetAddressLine1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="streetAddressLine2"
                name="streetAddressLine2"
                value={cred.streetAddressLine2}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">StreetAddressLine1</label>
            </div>
        
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="city"
                name="city"
                value={cred.city}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="state"
                name="state"
                value={cred.state}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">State</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="postalCode"
                name="postalCode"
                value={cred.postalCode}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">Postal Code</label>
            </div>
        
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="country"
                name="country"
                value={cred.country}
                onChange={textChange}
              />
              <label htmlFor="floatingInput">Country</label>
            </div>
        
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={cred.password}
                onChange={textChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Password"
                name="confirmPassword"
                value={cred.confirmPassword}
                onChange={textChange}
              />
              <label htmlFor="floatingConfirmPassword"> Confirm Password</label>
            </div>
          </div>
          Already have an acoount ?
          <div style={{ textAlign: "center" }}>
            {" "}
            <Link to="/">Login here ... </Link>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "12vh", marginTop: "3vh" }}
            onClick={uploadData}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;