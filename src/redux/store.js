import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    wishlist:wishlistReducer,
    cart:cartReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})