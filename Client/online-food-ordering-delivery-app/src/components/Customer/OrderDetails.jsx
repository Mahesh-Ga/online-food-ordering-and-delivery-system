import { useEffect, useState } from "react";
import { getCustomerCart } from "../../services/cart";
import { getAddresses } from "../../services/address";
import { placeOrderFromCart } from "../../services/order";
import { toast } from "react-toastify";

function OrderDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [selectedRestId, setSelectedRestId] = useState();

  // const navigate = useNavigate();

  const fetchCartItems = async () => {
    const response = await getCustomerCart();
    setCartItems(response);
  };

  const fetchCustomerAddresses = async () => {
    const response = await getAddresses();
    setCustomerAddresses(response);
  };

  const placeOrder = async () => {
    const response = await placeOrderFromCart(selectedRestId);
    toast.success(response);
  };

  useEffect( () => {
    fetchCartItems();
    fetchCustomerAddresses();
  }, []);

  const check = (args) => {
    setSelectedRestId(args.target.id);
  };

  return (
    <>
      <div className="body" style={{ minHeight: "100vh" }}>
        <hr />
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h4 style={{ textAlign: "center" }}>ORDER SUMMARY</h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                     cartItems.map((cartItem) => {
                      return (
                        <tr key={cartItem.restaurant_id}>
                          <td>{cartItem.product_name}</td>
                          <td>{cartItem.quantity}</td>
                          <td>{cartItem.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <h3 style={{ textAlign: "center" }}>
                  Total Price : ₹
                  {cartItems.reduce((total, cartItem) => {
                    return total + cartItem.price * cartItem.quantity;
                  }, 0)}
                </h3>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Place Order
                </button>
              </div>
            </div>
            {/* <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Select Delivery Address
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h4>
                      <i className="fa fa-map-marker" aria-hidden="true">
                        {" "}
                        Your Addresses
                      </i>
                    </h4>

                    {customerAddresses.length === 0 ? (
                      <h5>No address found. Please add new Address</h5>
                    ) : (
                      customerAddresses.map((customerAddress) => {
                        return (
                          <div
                            className="accordion"
                            id="accordionExample"
                            key={customerAddress.id}
                          >
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${customerAddress.id}`}
                                  aria-expanded="true"
                                  aria-controls={`collapse${customerAddress.id}`}
                                >
                                  <input
                                    type="radio"
                                    name="btnradio"
                                    id={customerAddress.id}
                                    onChange={check}
                                  />
                                  <label htmlFor={customerAddress.id}>
                                    &nbsp; {customerAddress.city},{" "}
                                    {customerAddress.state}
                                  </label>
                                </button>
                              </h2>
                              <div
                                id={`collapse${customerAddress.id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  Street address Line 1 ={" "}
                                  {customerAddress.streetAddressLine1}, <br />
                                  Street address Line 2 ={" "}
                                  {customerAddress.streetAddressLine2}, <br />
                                  City = {customerAddress.city},<br />
                                  State = {customerAddress.state},<br />
                                  Country = {customerAddress.country},<br />
                                  Postal Code = {customerAddress.postalCode}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        placeOrder(selectedRestId);
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
