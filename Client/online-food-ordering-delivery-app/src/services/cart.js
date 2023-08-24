import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function addCartItem(menuItemId) {
    const url = createUrl('/cart/add/' + menuItemId)
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

export async function removeCartItem(menuItemId) {
    const url = createUrl('/cart/' + menuItemId)
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.put(url,{}, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function getCustomerCart() {
    const url = createUrl('/cart')
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


export async function deleteItemFromCart(menuItemId) {
    const url = createUrl('/cart/' + menuItemId)
    const token = sessionStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.delete(url, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}