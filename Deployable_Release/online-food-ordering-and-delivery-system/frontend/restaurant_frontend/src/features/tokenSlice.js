import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        tokenValue: ''
    },
    reducers: {
        setToken: (state,value) => {
            debugger
            state.tokenValue = value.payload
        },
        removeToken: (state) => {
            debugger
            state.tokenValue = 'abcdef'
        }
    }
})

export const {setToken , removeToken} = tokenSlice.actions
export default tokenSlice.reducer