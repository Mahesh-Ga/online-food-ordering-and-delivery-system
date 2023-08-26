import { createSlice } from "@reduxjs/toolkit";


export const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        status: false
    },
    reducers: {
        setToggle: (state) => {
            debugger
            state.status = !state.status
        }
    }
})

export const {setToggle} = toggleSlice.actions
export default toggleSlice.reducer