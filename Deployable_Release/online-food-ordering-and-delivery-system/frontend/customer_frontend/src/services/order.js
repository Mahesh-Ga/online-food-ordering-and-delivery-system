import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function placeOrderFromCart(addressId) {
    const url = createUrl('/customer/order/' + addressId)
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };
  
    try {
        const response = await axios.post(url,{}, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function getMenuByOrder(orderId) {
    const url = createUrl('/restaurant/orderMenuItems/' + orderId)
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };
  
    try {
        const response = await axios.get(url, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function getOrderByOrderId(orderId) {
    const url = createUrl('/customer/order/' + orderId)
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };
  
    try {
        const response = await axios.get(url, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

