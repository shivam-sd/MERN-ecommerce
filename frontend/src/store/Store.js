import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice' // Ensure correct path
import sellerReducer from './sellerSlice' // Ensure correct path
import productReducer from './productSlice' // Ensure correct path

export const store = configureStore({
  reducer: {
    user: userReducer, // Assigning the user slice reducer
    seller: sellerReducer, // Assigning the seller slice reducer
    product: productReducer, // Assigning the product slice reducer
  },
})

export default store; // Optional: Export store for easy imports
