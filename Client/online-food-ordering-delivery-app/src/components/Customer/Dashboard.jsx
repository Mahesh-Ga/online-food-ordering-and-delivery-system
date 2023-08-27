import axios from "axios";
import { getAllMenu, getMenuByCategory } from "../../services/menu";
import { getAllRestaurants } from "../../services/restaurant";
import { log } from "../../utilities/utils";
import "./Dashboard.css";
import "./VegToggleButton.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isVegMenu, setIsVegMenu] = useState(false);
  const [menus, setMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [query, setQuery] = useState("");
  const [menuResults, setMenuResults] = useState([]);
  const [restaurantResults, setRestaurantResults] = useState([]);

  const toggleMenu = () => {
    setIsVegMenu(!isVegMenu);
  };
     
  useEffect(()=>{
    handleMenuSearch();
  },[isVegMenu])
     

  const buttonClasses = isVegMenu ? "btn veg-menu" : "btn all-menu";
  const navigate = useNavigate();

  const handleMenuSearch = async () => {
    try {
      let url = `https://localhost:7070/restaurant/menu/search?query=${query}`;
 
      if (isVegMenu) {
        url += "&category=VEG";
      }
      const response = await axios.get(url);
      setMenuResults(response.data);
    } catch (error) {
      log(error)
    }
  }

  const handleRestaurantSearch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7070/restaurant/search?query=${query}`
      );
      setRestaurantResults(response.data);
    } catch (error) {
      log(error);
    }
  };

  // const fetchRestaurantsByCategory = async (category) => {
  //   setIsVegMenu(!isVegMenu);
  //   try {
  //     const response = await getMenuByCategory(category);
  //     setVegMenu(response);
  //     handleMenuSearch()  
  //   } catch (error) {
  //     log(error);
  //   }
  // };

  useEffect(() => {
    async function fetchMenus() {
      const response = await getAllMenu();
      setMenus(response);
    }

    async function fetchRestaurants() {
      const response = await getAllRestaurants();
      setRestaurants(response);
    }

    fetchMenus();
    fetchRestaurants();
  }, []);

  const onChangeQuery = (args) => {
    setQuery(args.target.value);
    if (args.target.value.trim() !== "") {
      handleMenuSearch();
      handleRestaurantSearch();
    } else {
      setMenuResults([]);
      setRestaurantResults([]);
    }
  };

  return (
    <>
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
                      value={query}
                      onChange={onChangeQuery}
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
              ></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              <div className="card mt-3">
                <div className=" d-flex flex-row-reverse">
                  <div className="p-2">
                    <button
                      className={buttonClasses}
                      onClick={() => {
                        toggleMenu();
                      }}
                    >
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
              {/* {isVegMenu ? (
                <div className="d-flex flex-direction-row">
                  {vegMenus.map((menu) => {
                    return (
                      <div
                        className="card"
                        style={{ width: "18rem" }}
                        onClick={() => {
                          navigate(`/menu`, {
                            state: { restaurantId: menu.restaurant_id },
                          });
                        }}
                        key={menu.id}
                      >
                        <img
                          src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                          className="card-img-top"
                          alt={`${menu.name + " " + "image"}`}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{menu.name}</h5>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
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
                          <p style={{ display: "flex", justifyContent: "end" }}>
                            {menu.menuType}{" "}
                          </p>
                          From <h4>{menu.restaurantName}</h4>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <h6>₹{menu.price}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  {query.length === 0 ? (
                    <div className="d-flex flex-direction-row">
                      {menus.map((menu) => {
                        return (
                          <div
                            className="card"
                            style={{ width: "18rem" }}
                            onClick={() => {
                              navigate(`/menu`, {
                                state: { restaurantId: menu.restaurant_id },
                              });
                            }}
                            key={menu.id}
                          >
                            <img
                              src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                              className="card-img-top"
                              alt={`${menu.name + " " + "image"}`}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{menu.name}</h5>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
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
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                {menu.menuType}{" "}
                              </p>
                              From <h4>{menu.restaurantName}</h4>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <h6>₹{menu.price}</h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="d-flex flex-direction-row">
                      {menuResults.map((menu) => {
                        return (
                          <div
                            className="card"
                            style={{ width: "18rem" }}
                            onClick={() => {
                              navigate(`/menu`, {
                                state: { restaurantId: menu.restaurant_id },
                              });
                            }}
                            key={menu.id}
                          >
                            <img
                              src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                              className="card-img-top"
                              alt={`${menu.name + " " + "image"}`}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{menu.name}</h5>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
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
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                {menu.menuType}{" "}
                              </p>
                              From <h4>{menu.restaurantName}</h4>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <h6>₹{menu.price}</h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )} */}

              {query.length === 0 && !isVegMenu ? (
                    <div className="d-flex flex-direction-row">
                      {menus.map((menu) => {
                        return (
                          <div
                            className="card"
                            style={{ width: "18rem" }}
                            onClick={() => {
                              navigate(`/menu`, {
                                state: { restaurantId: menu.restaurant_id },
                              });
                            }}
                            key={menu.id}
                          >
                            <img
                              src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                              className="card-img-top"
                              alt={`${menu.name + " " + "image"}`}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{menu.name}</h5>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
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
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                {menu.menuType}{" "}
                              </p>
                              From <h4>{menu.restaurantName}</h4>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <h6>₹{menu.price}</h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="d-flex flex-direction-row">
                      {menuResults.map((menu) => {
                        return (
                          <div
                            className="card"
                            style={{ width: "18rem" }}
                            onClick={() => {
                              navigate(`/menu`, {
                                state: { restaurantId: menu.restaurant_id },
                              });
                            }}
                            key={menu.id}
                          >
                            <img
                              src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                              className="card-img-top"
                              alt={`${menu.name + " " + "image"}`}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{menu.name}</h5>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
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
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                {menu.menuType}{" "}
                              </p>
                              From <h4>{menu.restaurantName}</h4>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <h6>₹{menu.price}</h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
            
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
              {query.length === 0 ? (
                <div className="d-flex flex-direction-row">
                  {restaurants.map((rest) => {
                    return (
                      <div
                        className="card"
                        style={{ width: "18rem" }}
                        onClick={() => {
                          navigate(`/menu`, {
                            state: { restaurantId: rest.id },
                          });
                        }}
                        key={rest.id}
                      >
                        <img
                          src={`https://localhost:7070/restaurant/restaurantImage/${rest.id}`}
                          className="card-img-top"
                          alt={`image for ${rest.restaurantName}`}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{rest.restaurantName}</h5>
                          <p
                            style={{ display: "flex", justifyContent: "end" }}
                            className="card-text"
                          >
                            {rest.cuisine}
                          </p>
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                          <p className="card-text">
                            {rest.address.streetAddressLine1} ,{" "}
                            {rest.address.streetAddressLine2},{" "}
                            {rest.address.city}, {rest.address.postalCode}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="d-flex flex-direction-row">
                  {restaurantResults.map((rest) => {
                    return (
                      <div
                        className="card"
                        style={{ width: "18rem" }}
                        onClick={() => {
                          navigate(`/menu`, {
                            state: { restaurantId: rest.id },
                          });
                        }}
                        key={rest.id}
                      >
                        <img
                          src={`https://localhost:7070/restaurant/restaurantImage/${rest.id}`}
                          className="card-img-top"
                          alt={`image for ${rest.restaurantName}`}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{rest.restaurantName}</h5>
                          <p
                            style={{ display: "flex", justifyContent: "end" }}
                            className="card-text"
                          >
                            {rest.cuisine}
                          </p>
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                          <p className="card-text">
                            {rest.address.streetAddressLine1} ,{" "}
                            {rest.address.streetAddressLine2},{" "}
                            {rest.address.city}, {rest.address.postalCode}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
