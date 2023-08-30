import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import tokenSlice from './features/tokenSlice'
import toggleSlice from './features/toggleSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice ,
        token : tokenSlice,
    }

})
