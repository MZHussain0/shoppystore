import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemsFromCart,
  fetchItemsByUserId,
  updateCart,
} from "./cartAPI";
import { fetchProductByIdAsync } from "../product/productSlice";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateItemsAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);

export const deleteItemsFromCartAsync = createAsyncThunk(
  "cart/deleteItemsFromCart",
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
        // state.items = [...state.items, action.payload];
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })

      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (itemId) => itemId === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const { cart } = cartSlice.actions;
export const selectCart = (state) => state.cart.items;

export default cartSlice.reducer;
