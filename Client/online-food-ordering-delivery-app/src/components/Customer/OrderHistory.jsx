import { useEffect, useState } from "react";
import {
  allOrdersForCustomer,
  completeFeedback,
  giveFeedback,
} from "../../services/user";
import { getMenuByOrder } from "../../services/order";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [menus, setMenus] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await allOrdersForCustomer();
    setOrders(response);
  };

  const fetchMenuByOrders = async (orderId) => {
    const response = await getMenuByOrder(orderId);
    setMenus(response);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [ratings, setRatings] = useState({}); // State to store selected ratings

  const handleRatingChange = async (orderId, menuId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [orderId]: {
        ...prevRatings[orderId],
        [menuId]: rating,
      },
    }));
    await giveFeedback(menuId, orderId, rating);
  };

  const submitFeedback = async (orderId) => {
    const response = await completeFeedback(orderId);
    toast.success(response);
    fetchOrders()
  };
  return (
    <>
      <div className="body" style={{ minHeight: "100vh" }}>
        <hr />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h4 style={{ textAlign: "center" }}>YOUR ORDERS</h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {orders.length === 0 ? (
                <>
                  <h5 style={{ textAlign: "center" }}>No orders yet</h5>
                </>
              ) : (
                orders.map((order) => {
                  return (
                    <div
                      className="accordion"
                      id="accordionExample"
                      key={order.id}
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${order.id}`}
                            aria-expanded="true"
                            aria-controls={`collapse${order.id}`}
                            onClick={() => {
                              fetchMenuByOrders(order.id);
                            }}
                          >
                            <table className="table table-hover table-striped">
                              <thead>
                                <tr>
                                  <th>Ordered At</th>
                                  <th>Status</th>
                                  <th>Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {order.orderTimestamp.substring(0, 10)}{" "}
                                    {order.orderTimestamp.substring(11, 19)}
                                  </td>
                                  <td
                                    style={{ textDecorationLine: "underline" }}
                                  >
                                    {order.status} 
                                  </td>
                                  <td>₹{order.totalPrice}</td>
                                </tr>
                              </tbody>
                           
                            </table>
                          
                          </button>
                    
                      
                        </h2>
                        <div
                          id={`collapse${order.id}`}
                          className="accordion-collapse collapse "
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                          {order.status === "PENDING"  && <>  
                                  <button type="button" className="btn btn-info" style={{display : "block", margin :"0 auto"}} onClick={()=> {navigate("/payment", {
      state: { orderId : order.id },
    })}}>Make a payment</button>
                                    </>}
                          
                            <h5>Menu Items Purchased</h5>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Quantity</th>
                                  <th>Purchased at</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {menus.map((menu) => {
                                  return (
                                    <tr key={menu.menuName}>
                                      <td>{menu.menuName}</td>
                                      <td>{menu.quantity}</td>
                                      <td>₹{menu.priceAtOrder}</td>
                                      <td>
                                        {order.status === "REVIEW" && (
                                          <>
                                            <select
                                              value={
                                                ratings[order.id]?.[
                                                  menu.menu.id
                                                ] || ""
                                              }
                                              onChange={(e) => {
                                                handleRatingChange(
                                                  order.id,
                                                  menu.menu.id,
                                                  e.target.value
                                                );
                                              }}
                                            >
                                              <option value="">
                                                Select Rating
                                              </option>
                                              <option value="1">1 Star</option>
                                              <option value="2">2 Stars</option>
                                              <option value="3">3 Stars</option>
                                              <option value="4">4 Stars</option>
                                              <option value="5">5 Stars</option>
                                            </select>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                          
                            </table>
                           { order.status === "REVIEW" && <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  submitFeedback(order.id);
                                }}

                                style={{
                                  margin : "0 auto",
                                  display : "block"
                                }}
                              >
                                Submit feedback
                              </button>}
                            <h5>Delivery Address</h5>
                            <p>
                              Street address Line 1 ={" "}
                              {order.customerAddress.streetAddressLine1}, Street
                              address Line 2 ={" "}
                              {order.customerAddress.streetAddressLine2}, City ={" "}
                              {order.customerAddress.city}, State ={" "}
                              {order.customerAddress.state}, Country ={" "}
                              {order.customerAddress.country}, Postal Code ={" "}
                              {order.customerAddress.postalCode}
                            </p>
                            <h5> Ordered from</h5>
                            <p>
                              {order.restaurant.restaurantName} -{" "}
                              {order.restaurant.address.city},{" "}
                              {order.restaurant.address.state}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
