import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function getAllRestaurants() {
    const url = createUrl('/restaurant/getAllRestaurants')

    try {
        const response = await axios.get(url)
        // log(response.data)
        return response.data
    } catch (ex) {
        // log(ex)
        return ex.response.data
    }
}

export async function getRestaurantById(restId) {
    const url = createUrl(`/restaurant/getRestaurant/${restId}`)
    try {
        const response = await axios.get(url)
        log(response)
        return response.data
    } catch (ex) {
        // log(ex)
        return ex.response.data
    }
}
