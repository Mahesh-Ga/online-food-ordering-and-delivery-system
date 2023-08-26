import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function registerUser(
    firstName,
    lastName,
    email,
    password,
    mobile_no
) {
    const url = createUrl('/customer/signup')
    const body = {
        firstName,
        lastName,
        email,
        password,
        mobile_no
    }

    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function loginUser(email, password) {
    const url = createUrl('/user/signin')
    const body = { // no need to write "email" : email
        email,
        password,
    }

    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (ex) {
        try {
        return ex.response.data
        }catch(ex){
            return ex.response
        }
    }
}



export async function getCustomerProfile() {
    const url = createUrl('/customer')
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { headers })
        log(response.data)
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}


export async function changeCustomerPassword(oldPassword, newPassword) {
    const url = createUrl('/customer/password')
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const body = {
       oldPassword,
       newPassword
    }

    try {
        const response = await axios.put(url, body, { headers })
        log(response.data)
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}

export async function updateCustomerProfile(firstName, lastName , mobile_no) {
    const url = createUrl('/customer')
    const token = sessionStorage.getItem("token")
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const body = {
        firstName,
        lastName,
        mobile_no
    }

    try {
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}


export async function deleteCustomerProfile() {
    const url = createUrl('/customer')
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


