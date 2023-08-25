import axios from 'axios'
import { createUrl, log } from '../utilities/utils'

export async function getAllMenu() {
    const url = createUrl('/restaurant/menu')

    try {
        const response = await axios.get(url)
        // log(response.data)
        return response.data
    } catch (ex) {
        // log(ex)
        return ex.response.data
    }
}

export async function getMenuByRestId(id) {
    const url = createUrl("/restaurant/menubyResId/" + id)
    try {
        const response = await axios.get(url)
        return response.data
    } catch (ex) {
        return ex.response.data
    }
}
