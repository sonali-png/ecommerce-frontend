import {createSlice} from "@reduxjs/toolkit";
const initialState = {
  items : JSON.parse(localStorage.getItem("wishlist")) || []
};
const wishlistSlice = createSlice({
  name:"wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      
      const exists = state.items.includes(productId);

      if (exists) {
        const updated = state.items.filter(id => id !== productId);
        state.items = updated;
      } else {
        state.items.push(productId);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    }
  }
});
export const {toggleWishlist, setWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;