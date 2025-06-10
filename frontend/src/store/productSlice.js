import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      console.log("Product Details:", action.payload);
      state.product = action.payload; // Update state with the payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProductDetails } = productSlice.actions

export default productSlice.reducer
