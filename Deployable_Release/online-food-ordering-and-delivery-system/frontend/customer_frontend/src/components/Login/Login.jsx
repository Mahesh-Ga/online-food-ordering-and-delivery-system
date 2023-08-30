import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap-icons/bootstrap-icons.svg";
import "../../../node_modules/bootstrap-icons/icons/search.svg";
import { loginUser } from "../../services/user";
import { toast } from "react-toastify";
import { log } from "../../utilities/utils";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import jwtDecode from "jwt-decode";

function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateData = async () => {
    const response = await loginUser(cred.email, cred.password);

    if (response) {
      if (response.jwt !== null && response.jwt !== undefined) {
        sessionStorage.setItem("token", response.jwt);

        const decodedToken = jwtDecode(response.jwt);
        const authorities = decodedToken.authorities;
        if (authorities === "ROLE_CUSTOMER") {
          dispatch(login());
          navigate("/dashboard");
        } else {
          toast.error("Unauthorized Access");
        }
      } else {
        if (response.message) {
          toast.error(response.message);
        } else {
          toast.error(response.email || response.password);
        }
      }
    } else {
      toast.error("Server Error");
    }
  };

  const textChange = (args) => {
    var copy = { ...cred };
    copy[args.target.name] = args.target.value;
    setCred(copy);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundImage:
              "url('http://127.0.0.1:3000/assets/LoginImage.jpg')",
            width: "50%",
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: "1px 3px 4px black",
          }}
        ></div>

        <div
          style={{
            marginTop: "20vh",
            width: "70vh",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            marginLeft: "25vh",
            justifyContent: "center",
            boxShadow: "1px 2px 9px #F4AAB9",
          }}
        >
          <div
            className="row"
            style={{
              flexDirection: "column",
              width: "50vh",
              alignItems: "center",
            }}
          >
            <h4 style={{ textAlign: "center" }}>LOGIN</h4>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-3"
              style={{ width: "12vh" }}
              onClick={validateData}
            >
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </button>
            <h6 style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to="/register-customer">Register here</Link>
            </h6>
            <div class="btn-group" style={{ width: "15vh" }}>
              <button
                type="button"
                className="btn btn-info dropdown-toggle mt-3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login As
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="http://localhost:3002">
                    Admin
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="http://localhost:3001">
                    Restaurant
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="http://localhost:3003">
                    Delivery Partner
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;