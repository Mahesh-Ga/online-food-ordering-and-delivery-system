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
        // log(response.data)
        return response.data
    } catch (ex) {
        // log(ex)
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
        // log(response.data)
        return response.data
    } catch (ex) {
        // log(ex.response.data)
        return ex.response.data
    }
}
