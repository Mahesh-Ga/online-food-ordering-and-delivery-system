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
            // state.tokenValue = value.payload,
            state.id = value.payload.id
         state.restaurantName = value.payload.restaurantName
        //  state.cuisine = value.payload.cuisine
        //   state.email = value.payload.email
          debugger
    // mobileNumber: "1234567890",
    // fssai: "123123132",
   
    // streetAddressLine1: "string",
    // streetAddressLine2: "string",
    // city: "string",
    // state: "string",
    // postalCode: "string",
    // country: "string"
        },
        removeRestaurant: (state) => {
            debugger
            state.id=""
            state.restaurantName =""
        }
    }
})

export const {setRestaurant , removeRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer