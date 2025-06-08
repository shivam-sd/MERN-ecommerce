import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  seller: null
}

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setSellerDetails: (state, action) => {
      console.log("Seller Details:", action.payload);
      state.seller = action.payload; // Update state with the payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSellerDetails } = sellerSlice.actions

export default sellerSlice.reducer