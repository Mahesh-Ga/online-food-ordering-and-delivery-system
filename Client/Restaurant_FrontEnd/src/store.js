import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import tokenSlice from './features/tokenSlice'
import toggleSlice from './features/toggleSlice'
import restaurantSlice from './features/restaurantSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice ,
        token : tokenSlice,
        toggle : toggleSlice,
        restaurant : restaurantSlice
    }

})
