import axios from "axios";
import { createUrl } from "../utilities/utils";

export async function paymentIntent(totalPrice) {
    const url = createUrl('/payment/create-payment-intent')
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const body = {
        totalPrice,
    }

    try {
        const response = await axios.post(url,body, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}


export async function addPayment(paymentId, amount, paymentTimestamp, orderId) {
    const url = createUrl('/payment')
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const body = {
        paymentId,
        amount,
        paymentTimestamp,
        orderId
    }

    try {
        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}