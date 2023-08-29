import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderByOrderId } from "../../services/order";
import { log } from "../../utilities/utils";
import { addPayment, paymentIntent } from "../../services/payment";
import { toast } from "react-toastify";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState();

  const fetchOrder = async () => {
    const response = await getOrderByOrderId(location.state.orderId);
    setOrder(response);
    fetchClientSecret(response.totalPrice);
  };

  const fetchClientSecret = async (price) => {
    const response = await paymentIntent(price);
    setClientSecret(response);
  };

  const doPayment = async (paymentId, amount, paymentTimestamp, orderId) => {
    const response = await addPayment(
      paymentId,
      amount,
      paymentTimestamp,
      orderId
    );
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Billing details
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment Verified successfully");
      const paymentCreatedTimestamp = new Date(paymentIntent.created * 1000);
      doPayment(
        paymentIntent.id,
        paymentIntent.amount,
        paymentCreatedTimestamp,
        order.id
      );
      navigate("/order-history")
    }
  };

  return (
    <div className="payment-body">
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button className="payment-button" type="submit" disabled={!stripe}>
          Pay Now
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
