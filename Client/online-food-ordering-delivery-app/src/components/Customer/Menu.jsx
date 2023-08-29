import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Menu.css";
import "./rating.css";
import { getRestaurantById } from "../../services/restaurant";
import { getMenuByRestId } from "../../services/menu";
import {
  addCartItem,
  deleteItemFromCart,
  getCustomerCart,
  removeCartItem,
  resetCart,
} from "../../services/cart";
import { toast } from "react-toastify";
import { log } from "../../utilities/utils";



function Menu() {
  const [restaurant, setRestaurant] = useState({
    id: 0,
    restaurantName: "",
    address: {
      streetAddressLine1: "",
      streetAddressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    mobileNumber: "",
    fssai: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [menu, setMenu] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchRestaurant = async () => {
    const response = await getRestaurantById(location.state.restaurantId);
    setRestaurant(response);
  };

  const fetchMenuByRestaurant = async () => {
    const response = await getMenuByRestId(location.state.restaurantId);
    setMenu(response);
  };

  const fetchCartItems = async () => {
    const response = await getCustomerCart();
    setCartItems(response);
  };

  const addToCart = async (menuId) => {
    const response = await addCartItem(menuId);
    fetchCartItems();
    toast.success(response, {
      autoClose :500
    });
  };

  const removeFromCart = async (menuId) => {
    const response = await removeCartItem(menuId);
    fetchCartItems();
    toast.success(response,{
      autoClose :500
    });
    if(cartItems.length === 1) {
          log("callin greset")
          resetEntireCart()
        }
  };

  const deleteFromCart = async (menuId) => {
    if(cartItems.length === 1) {
          log("callin greset")
          resetEntireCart()
        }
    const response = await deleteItemFromCart(menuId);
    fetchCartItems();
    toast.success(response,{
      autoClose :500
    });
  };


  const resetEntireCart = async () => {
     await resetCart();
  }

  useEffect( () => {
     fetchRestaurant();
     fetchMenuByRestaurant();
     fetchCartItems();
  },[]);



  return (
    <>
      <div className="body" style={{ minHeight: "100vh" }}>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="col-md-1"></div>
            <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
              <div className="card p-4 mt-3">
                <div id="carouselExampleCaptions" className="carousel slide">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={`https://localhost:7070/restaurant/restaurantImage/${restaurant.id}`}
                        className="d-block w-100"
                        alt={`for ${restaurant.restaurantName}`}
                        height="500"
                        style={{ opacity: 0.75 }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>{restaurant.restaurantName}</h5>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <p className="card-text">
                          {restaurant.address.streetAddressLine1} ,{" "}
                          {restaurant.address.streetAddressLine2},{" "}
                          {restaurant.address.city}, {restaurant.address.state},
                          {restaurant.address.country},{" "}
                          {restaurant.address.postalCode}
                        </p>
                        <i className="fa fa-phone">
                          {" " + restaurant.mobileNumber}
                        </i>
                        {restaurant.fssai.length > 0 && (
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <img
                              src="http://localhost:3000/assets/FSSAI_logo.png"
                              className="fssai-logo"
                              alt="fssai"
                            ></img>{" "}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="carousel-item">
                                        <img src="http://127.0.0.1:3000/assets/Restaurants/restaurant2.jpg" className="d-block w-100" alt="..." height="500" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="http://127.0.0.1:3000/assets/Restaurants/restaurant3.jpg" className="d-block w-100" alt="..." height="500" />
                                    </div> */}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="col-md-1 p-4 mt-3">
                        <div className="collapse collapse-horizontal" id="collapseWidthExample">
                            <div className="list-group" style={{width: "300px"}}>
                            <h4>-  Filters</h4>
                            <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Location</h5>
                                <small></small>
                                </div>
                                <p className="mb-1"></p>
                                <small></small>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Rating</h5>
                                <small className="text-body-secondary"></small>
                                </div>
                                <p className="mb-1"></p>
                                <small className="text-body-secondary"></small>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Price Range</h5>
                                <small className="text-body-secondary"></small>
                                </div>
                                <p className="mb-1"></p>
                                <small className="text-body-secondary"></small>
                            </a>
                            </div>
                         </div> 
                        </div> */}
          </div>
          {/* <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              <div className="card mt-3">
                <div className=" d-flex flex-row-reverse">
                  <div className="p-4 pb-2 pt-2">
    
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <hr />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h4 style={{ textAlign: "center" }}>
                {restaurant.restaurantName}'s MENU
              </h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>

            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
              { menu.map((menu)=> {
                return (
                  <div className="card mb-3" key={menu.id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`https://localhost:7070/restaurant/menuImage/${menu.id}`}
                          className="img-fluid rounded-start"
                          alt={`${menu.name}`}
                          style={{ height: "250px", width: "350px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{menu.name}</h5>
                          <h6 className="card-text">₹ {menu.price}</h6>
                          <p className="card-text">
                            {menu.menuType} {"   "}
                            {menu.category === "VEG" ? (
                              <img
                                className="menu-type-img"
                                src="http://localhost:3000/assets/veg_symbol.png"
                                alt={`${menu.name}`}
                              />
                            ) : (
                              <img
                                className="menu-type-img"
                                src="http://localhost:3000/assets/non-veg.jpg"
                                alt={`${menu.name}`}
                              />
                            )}
                          </p>

                          <div className="ratings">
                            {(() => {
                              const stars = [];
                              for (let i = 0; i < 5; i++) {
                                stars.push(
                                  <i
                                    key={i}
                                    className={`fa fa-star ${
                                      i < menu.rating ? "rating-color" : ""
                                    }`}
                                  ></i>
                                );
                              }
                              return stars;
                            })()}
                          </div>

                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                addToCart(menu.id);
                              }}
                            >
                              <i
                                className="fa fa-shopping-cart"
                                aria-hidden="true"
                                
                              ></i>{" "}
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <p>
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  <i className="fa fa-shopping-cart fa-lg"> View cart</i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              </p>
              <div style={{ minHeight: "120px" }}>
                <div
                  className="collapse"
                  id="collapseWidthExample"
                >
                  <div className="card card-body">
                  {cartItems.length === 0 ? <h6 style={{textAlign : "center"}}>Empty Cart</h6> :
                    <div className="table-responsive">
                    
                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                         {
                          cartItems.map((cartItem) => {
                            return (
                              <tr key={cartItem.menu_id}>
                                <td>{cartItem.product_name}</td>
                                <td>{cartItem.quantity}</td>
                                <td>{cartItem.price}</td>
                                <td>
                                  <div
                                    className="btn-toolbar"
                                    role="toolbar"
                                    aria-label="Toolbar with button groups"
                                  >
                                    <div
                                      className="btn-group me-2"
                                      role="group"
                                      aria-label="First group"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => {
                                          addToCart(cartItem.menu_id);
                                        }}
                                      >
                                        +
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                          removeFromCart(cartItem.menu_id);
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                    <div
                                      className="btn-group me-2"
                                      role="group"
                                      aria-label="Second group"
                                    >
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                          deleteFromCart(cartItem.menu_id);
                                        }}
                                      >
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    {/* } */}
                      <h5>
                        Total Price : ₹
                       {
                        cartItems.reduce((total, cartItem) => {
                          return total + cartItem.price * cartItem.quantity
                        },0)
                        }
                      </h5>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {
                          navigate("/order-details");
                        }}
                      >
                       Proceed to Checkout
                      </button>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
