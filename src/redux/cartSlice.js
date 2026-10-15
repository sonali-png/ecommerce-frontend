import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userApi from '../api/userApi';

// Thunks for Authenticated Database Actions
export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userId) => {
  const response = await userApi.get(`/cart/${userId}`);
  return response.data.items; 
});

export const addToUserCartServer = createAsyncThunk('cart/addToUserCartServer', async ({ userId, item }) => {
  const response = await userApi.post(`/cart/${userId}/add`, { item });
  return response.data.items;
});

export const mergeGuestCartServer = createAsyncThunk('cart/mergeGuestCartServer', async ({ userId, guestItems }) => {
  const response = await userApi.post(`/cart/${userId}/merge`, { items: guestItems });
  return response.data.items;
});

export const updateCartQuantityServer = createAsyncThunk('cart/updateCartQuantityServer', async ({ userId, productId, quantity }) => {
  const response = await userApi.post(`/cart/${userId}/update-quantity`, { productId, quantity });
  return response.data.items;
});

export const removeFromUserCartServer = createAsyncThunk( "cart/removeFromUserCartServer", async ({ userId, productId }) => {
  const response = await userApi.post(`/cart/${userId}/remove`, { productId,});
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
      const existingItem = state.items.find(item => item.productId === action.payload.productId && item.color === action.payload.color);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('guest_cart', JSON.stringify(state.items));
    },
    updateGuestQuantity: (state, action) => {
      const { productId, quantity, color } = action.payload;
      const item = state.items.find(i => i.productId === productId  && i.color === color);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('guest_cart', JSON.stringify(state.items));
    },
    removeFromGuestCart: (state, action) => {
      const { sku } = action.payload;
      state.items = state.items.filter(item => item.sku.trim() !== sku.trim());
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
      })
      .addCase(removeFromUserCartServer.fulfilled, (state, action) => {
          state.items = action.payload;
      });
  }
});

export const { addToGuestCart, clearGuestCart, removeFromGuestCart, updateGuestQuantity } = cartSlice.actions;
export default cartSlice.reducer;
