import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function getAllRestaurants() {
    const url = createUrl('/restaurant/getAllRestaurant')

    try {
        const response = await axios.get(url)
        // log(response.data)
        return response.data
    } catch (ex) {
        // log(ex)
        return ex.response.data
    }
}
