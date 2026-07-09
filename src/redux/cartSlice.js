import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for Authenticated Database Actions
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userId) => {
  const response = await axios.get(`/cart/${userId}`);
  return response.data.items; 
});

export const addToUserCartServer = createAsyncThunk('cart/addToUserCartServer', async ({ userId, item }) => {
  const response = await axios.post(`/cart/${userId}/add`, { item });
  return response.data.items;
});

export const mergeGuestCartServer = createAsyncThunk('cart/mergeGuestCartServer', async ({ userId, guestItems }) => {
  const response = await axios.post(`/cart/${userId}/merge`, { items: guestItems });
  return response.data.items;
});

export const updateCartQuantityServer = createAsyncThunk('cart/updateCartQuantityServer', async ({ userId, productId, quantity }) => {
  const response = await axios.post(`/cart/${userId}/update-quantity`, { productId, quantity });
  return response.data.items;
});

const initialState = {
  items: JSON.parse(localStorage.getItem('guest_cart')) || [],
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Guest Local Reducers
    addToGuestCart: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('guest_cart', JSON.stringify(state.items));
    },
    updateGuestQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('guest_cart', JSON.stringify(state.items));
    },
    removeFromGuestCart: (state, action) => {
      // action.payload should be the productId string
      state.items = state.items.filter(item => item.productId !== action.payload);
      localStorage.setItem('guest_cart', JSON.stringify(state.items));
    },
    clearGuestCart: (state) => {
      state.items = [];
      localStorage.removeItem('guest_cart');
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch authenticated items
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      // Direct remote add
      .addCase(addToUserCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartQuantityServer.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Handle login merging mechanics
      .addCase(mergeGuestCartServer.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.removeItem('guest_cart'); // Safe to wipe local backup now
      });
  }
});

export const { addToGuestCart, clearGuestCart } = cartSlice.actions;
export default cartSlice.reducer;
