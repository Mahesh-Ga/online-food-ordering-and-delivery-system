import { createSlice } from "@reduxjs/toolkit";


export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
     id: '',
    restaurantName: '',
    
    },
    reducers: {
      setRestaurant: (state,value) => {
            debugger
            state.id = value.payload.id
        },
        removeRestaurant: (state) => {  
            state.id=""
        }
    }
})

export const {setRestaurant , removeRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer