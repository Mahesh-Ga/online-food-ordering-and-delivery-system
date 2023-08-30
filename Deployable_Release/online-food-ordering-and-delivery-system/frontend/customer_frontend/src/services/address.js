import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function getAddresses() {
    const url = createUrl('/customer/addresses/')
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

export async function updateAddress(addressId,streetAddressLine1,streetAddressLine2,state,city,postalCode,country) {
    const url = createUrl('/customer/addresses/' + addressId)
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const body = {
        streetAddressLine1,
        streetAddressLine2,
        state,
        city,
        postalCode,
        country
     }
    try {
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function addAddress(streetAddressLine1,streetAddressLine2,state,city,postalCode,country) {
    const url = createUrl('/customer/addresses')
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const body = {
        streetAddressLine1,
        streetAddressLine2,
        state,
        city,
        postalCode,
        country
     }
    try {
        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function deleteAddress(addressId) {
    const url = createUrl('/customer/addresses/' + addressId)
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.delete(url,{ headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}
