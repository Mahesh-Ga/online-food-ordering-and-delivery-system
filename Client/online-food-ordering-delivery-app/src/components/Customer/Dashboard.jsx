import { getAllMenu } from "../../services/menu";
import { log } from "../../utilities/utils";
import "./Dashboard.css";
import "./VegToggleButton.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isVegMenu, setIsVegMenu] = useState(false);
  const [menus, setMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  
  const toggleMenu = () => {
    setIsVegMenu(!isVegMenu);
  };

  const buttonClasses = isVegMenu ? "btn veg-menu" : "btn all-menu";
  const navigate = useNavigate();

  //   const getAllMenus = async () => {
  //     const response = await getAllMenu();
  //     log(response);
  //     setMenus(response);
  //   };
  useEffect(() => {
    async function fetchMenus() {
      const response = await getAllMenu();
      log(response);
      setMenus(response);
    }
    fetchMenus();
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="body" style={{ minHeight: "100vh" }}>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="col-md-1"></div>
            <div className="col-md-9">
              <div className="card p-4 mt-3">
                <h3 className="heading mt-5 text-center">
                  Search for your Favorite food or Restaurant ...
                </h3>
                <div className="d-flex justify-content-center px-5">
                  <div className="search">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      name=""
                    />
                    <a href="#" className="search-icon">
                      <i className="fa fa-search"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1 p-4 mt-3">
              <div
                className="collapse collapse-horizontal"
                id="collapseWidthExample"
              >
                <div className="list-group" style={{ width: "300px" }}>
                  <h4>- Filters</h4>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Location</h6>
                      <small></small>
                    </div>
                    <p className="mb-1"></p>
                    <small></small>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Rating</h6>
                      <small className="text-body-secondary"></small>
                    </div>
                    <p className="mb-1"></p>
                    <small className="text-body-secondary"></small>
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Price Range</h6>
                      <small className="text-body-secondary"></small>
                    </div>
                    <p className="mb-1"></p>
                    <small className="text-body-secondary"></small>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              <div className="card mt-3">
                <div className=" d-flex flex-row-reverse">
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn btn-primary position-relative"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseWidthExample"
                      aria-expanded="false"
                      aria-controls="collapseWidthExample"
                    >
                      Filter
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        2
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </div>
                  <div className="p-2">
                    <button className={buttonClasses} onClick={toggleMenu}>
                      Pure Veg
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container mt-4">
          <h2 style={{ textAlign: "center" }}>DISHES</h2>
        </div>
        <hr />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
            <div
              className="col-xs-10 col-sm-10 col-md-10 col-lg-10"
              style={{
                backgroundColor: "#eee",
                boxShadow: "1px 2px 9    px #F4AAB9",
              }}
            >
              <div className="d-flex flex-direction-row">
                {menus.map((menu) => {
                  return (
                    <div
                      className="card"
                      style={{ width: "18rem" }}
                      onClick={() => {
                        navigate("/restaurants");
                      }}
                      key={menu.id}
                    >
                      <img
                        src={``}
                        className="card-img-top"
                        alt={`${menu.name + " " + "image"}`}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{menu.name}</h5>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          {menu.category === "VEG" ? (
                            <img
                              className="menu-type-img"
                              src="http://localhost:3000/assets/veg_symbol.png"
                              alt={`${menu.name + " " + "image"}`}
                            />
                          ) : (
                            <img
                              className="menu-type-img"
                              src="http://localhost:3000/assets/non-veg.jpg"
                              alt={`${menu.name + " " + "image"}`}
                            />
                          )}
                        </div>
                        <p>{menu.menuType} </p>
                        <p>{ menu.restaurantName }</p>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                       <h6>₹{menu.price}</h6> 
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
          </div>
        </div>
        <hr />
        <div className="container mt-4">
          <h2 style={{ textAlign: "center" }}>RESTAURANTS</h2>
        </div>
        <hr />

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
            <div
              className="col-xs-10 col-sm-10 col-md-10 col-lg-10"
              style={{
                backgroundColor: "#eee",
                boxShadow: "1px 2px 9px #F4AAB9",
              }}
            >
              <div className="d-flex flex-direction-row">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate("/menu");
                  }}
                >
                  <img
                    src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Click to proceed
                    </a>
                  </div>
                </div>
                {/* <div
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate("/menu");
                  }}
                >
                  <img
                    src="http://127.0.0.1:3000/assets/Dishes/ramen.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Click to proceed
                    </a>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate.to("/menu");
                  }}
                >
                  <img
                    src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Click to proceed
                    </a>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate.to("/menu");
                  }}
                >
                  <img
                    src="http://127.0.0.1:3000/assets/Dishes/ramen.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Click to proceed
                    </a>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  onClick={() => {
                    navigate.to("/menu");
                  }}
                >
                  <img
                    src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Restaurant Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Click to proceed
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
