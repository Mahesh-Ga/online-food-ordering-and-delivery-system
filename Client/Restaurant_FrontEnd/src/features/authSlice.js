import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: false
    },
    reducers: {
        login: (state) => {
            debugger
            state.status = true
        },
        logout: (state) => {
            debugger
            state.status = false
        }
    }
})

export const {login , logout} = authSlice.actions
export default authSlice.reducer