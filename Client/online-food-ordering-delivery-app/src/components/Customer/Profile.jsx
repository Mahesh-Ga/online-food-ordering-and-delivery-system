import { useEffect, useState } from "react";
import {
  changeCustomerPassword,
  deleteCustomerProfile,
  getCustomerProfile,
  updateCustomerProfile,
} from "../../services/user";
import "./Profile.css";
import { toast } from "react-toastify";
import { log } from "../../utilities/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { addAddress, getAddresses } from "../../services/address";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile_no: "",
  });

  const [addressFields, setAddressFields] = useState({
    streetAddressLine1: "",
    streetAddressLine2: "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [addresses, setAddresses] = useState([]);

  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await changeCustomerPassword(oldPassword, newPassword);
      if (response === "Password changed successfully.") {
        toast.success(response + "Redirecting in 3s", {
          autoClose: 2500,
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          sessionStorage.removeItem("token");
          dispatch(logout());
          navigate("/");
        }, 3000);
      } else {
        toast.error(response.newPassword || response);
      }
    } catch (error) {
      log(error);
    }
  };

  const fetchProfile = async () => {
    const response = await getCustomerProfile();
    setProfile(response);
  }

  const fetchAddresses = async () => {
      const response = await getAddresses();
      setAddresses(response);
    }

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const textChange = (args) => {
    var copy = { ...profile };
    copy[args.target.name] = args.target.value;
    setProfile(copy);
  };

  const textChangePassword = (args) => {
    var copy = { ...passwordFields };
    copy[args.target.name] = args.target.value;
    setPasswordFields(copy);
  };

  const textChangeAddress = (args) => {
    var copy = { ...addressFields };
    copy[args.target.name] = args.target.value;
    setAddressFields(copy);
  };

  const updateProfile = async (firstName, lastName, mobile_no) => {
    const response = await updateCustomerProfile(
      firstName,
      lastName,
      mobile_no
    );
    if (response === "Profile updated successfully") toast.success(response);
    else toast.error(response);
  };

  const deleteProfile = async () => {
    const response = await deleteCustomerProfile();
    if (response === "Profile deleted successfully") {
      toast.success(response + "Redirecting in 3s");
      setTimeout(() => {
        sessionStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
      }, 3000);
    } else toast.error(response);
  };

  const addCustomerAddress = async (
    add1,
    add2,
    city,
    state,
    country,
    postalcode
  ) => {
    const response = await addAddress(
      add1,
      add2,
      state,
      city,
      postalcode,
      country
    );
    if (response === "Address added to customer.") {
      toast.success(response);
      fetchProfile()
      fetchAddresses()
    } else toast.error(response);
  };

  return (
    <>
      <div className="body" style={{ minHeight: "100vh" }}>
        <div className="container" style={{ marginTop: "10vh" }}>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "2.5vh",
              textDecorationLine: "underline",
            }}
          >
            <i class="fa fa-user" aria-hidden="true">
              {" "}
              PROFILE
            </i>
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
                  value={profile.firstName}
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
                  value={profile.lastName}
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
                  value={profile.email}
                  onChange={textChange}
                  readOnly
                  disabled
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
                  value={profile.mobile_no}
                  onChange={textChange}
                />
                <label htmlFor="floatingMobile">Mobile No.</label>
              </div>
            </div>

            <div className="container" style={{ marginTop: "2.5vh" }}>
              <h4
                style={{
                  textAlign: "center",
                  marginBottom: "2.5vh",
                  textDecorationLine: "underline",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true">
                  {" "}
                  YOUR ADDRESSES
                </i>
              </h4>

              {addresses.length == 0 ? (
                <>
                  <h5 style={{ textAlign: "center" }}>
                    No address found. Please add new Address{" "}
                  </h5>
               
                </>
              ) : (
                addresses.map((customerAddress) => {
                  return (
                    <div
                      class="accordion"
                      id="accordionExample"
                      key={customerAddress.id}
                    >
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${customerAddress.id}`}
                            aria-expanded="true"
                            aria-controls={`collapse${customerAddress.id}`}
                          >
                          <i class="fa fa-map-marker" aria-hidden="true">     City -   {customerAddress.city} ,
                           State -  {customerAddress.state}</i>
                          </button>
                        </h2>
                        <div
                          id={`collapse${customerAddress.id}`}
                          class="accordion-collapse collapse "
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                           Street address Line 1 = {customerAddress.streetAddressLine1}, <br/>
                           Street address Line 2 = {customerAddress.streetAddressLine2}, <br/>
                           City = {customerAddress.city},<br/> 
                           State = {customerAddress.state},<br/>
                           Country =  {customerAddress.country},<br/>
                           Postal Code = {customerAddress.postalCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
                 <div className="center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ width: "20vh", marginTop: "1vh" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                    >
                      <i class="fa fa-map-marker lg" aria-hidden="true">
                        {" "}
                        Add address
                      </i>
                    </button>
                  </div>
            </div>

            <div className="profile-buttons">
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "20vh", marginTop: "3vh" }}
                onClick={() => {
                  updateProfile(
                    profile.firstName,
                    profile.lastName,
                    profile.mobile_no
                  );
                }}
              >
                Update profile
              </button>

              <button
                type="button"
                className="btn btn-danger"
                style={{ width: "20vh", marginTop: "3vh" }}
                onClick={() => {
                  deleteProfile(
                    profile.firstName,
                    profile.lastName,
                    profile.mobile_no
                  );
                }}
              >
                Delete profile
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "20vh", marginTop: "3vh" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Change your current Password
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter your current password"
                    name="oldPassword"
                    value={passwordFields.oldPassword}
                    onChange={textChangePassword}
                  />
                  <label htmlFor="floatingFirst">Current Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter your new password"
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={textChangePassword}
                  />
                  <label htmlFor="floatingFirst">New Password</label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => {
                    changePassword(
                      passwordFields.oldPassword,
                      passwordFields.newPassword
                    );
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add address
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter street address 1 "
                    name="streetAddressLine1"
                    value={addressFields.streetAddressLine1}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">Street address 1</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter street address 2"
                    name="streetAddressLine2"
                    value={addressFields.streetAddressLine2}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">Street address 2</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter City"
                    name="city"
                    value={addressFields.city}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">City</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter State"
                    name="state"
                    value={addressFields.state}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">State</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter country"
                    name="country"
                    value={addressFields.country}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">Country</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirst"
                    placeholder="Enter Postal Code"
                    name="postalCode"
                    value={addressFields.postalCode}
                    onChange={textChangeAddress}
                  />
                  <label htmlFor="floatingFirst">Postal Code</label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-bs-dismiss="modal" 
                  onClick={() => {
                    addCustomerAddress(
                      addressFields.streetAddressLine1,
                      addressFields.streetAddressLine2,
                      addressFields.city,
                      addressFields.state,
                      addressFields.country,
                      addressFields.postalCode
                    );
                  }}

                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
