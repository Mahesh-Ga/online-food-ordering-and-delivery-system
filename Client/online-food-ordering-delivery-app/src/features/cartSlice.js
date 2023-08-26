import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  // name of slice (must be unique)
  name: 'cart',
  initialState: {
    itemCounter: 0,
  },
  reducers: {
    // action: action handler
    addToCartAction: (state) => {
      state.itemCounter += 1
    },
    // action: action handler
    removeFromCartAction : (state) => {
      state.itemCounter -= 1
    },
  },
})

export const { addToCartAction, removeFromCartAction } = cartSlice.actions
export default cartSlice.reducer
