import { useEffect, useState } from "react";
import { getCustomerCart } from "../../services/cart";
import { useNavigate } from "react-router-dom";
import { getAddresses } from "../../services/user";
import { log } from "../../utilities/utils";
import { placeOrderFromCart } from "../../services/order";
import { toast } from "react-toastify";

function OrderDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [selectedRestId , setSelectedRestId] = useState();

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const response = await getCustomerCart();
    setCartItems(response);
  };

  const fetchCustomerAddresses = async () => {
    const response = await getAddresses();
    log(response);
    setCustomerAddresses(response);
  };

  const placeOrder = async () => {
    const response = await placeOrderFromCart(selectedRestId);
    log(response);
    toast.success(response)
  }

  useEffect(() => {
    fetchCartItems();
    fetchCustomerAddresses();
  }, []);


  const check = (args) => {
    setSelectedRestId(args.target.id);
  }

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
              <div class="table-responsive">
                <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((cartItem) => {
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
                  onClick={() => {
                    placeOrder()
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Place Order
                </button>
              </div>
            </div>
            {/* <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"> */}
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
                        Select Delivery Address
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    
                  <h4>
              <i className="fa fa-map-marker" aria-hidden="true">
                {" "}
                Your Addresses
              </i>
            </h4>
    
            {
            customerAddresses.length == 0 ? <h5>No address found. Please add new Address</h5>
            : customerAddresses.map((customerAddress) => {
              return (
                
                <div class="accordion" id="accordionExample" key={customerAddress.id}>
                     <input type="radio" className="btn-check" name="btnradio" id={customerAddress.id} onChange={check} />
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {customerAddress.city}, {customerAddress.state}
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        {customerAddress.streetAddressLine1} ,{" "}
                        {customerAddress.streetAddressLine2},{" "}
                        {customerAddress.city}, {customerAddress.state},
                        {customerAddress.country}, {customerAddress.postalCode}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
                    
                    </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-success">
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
