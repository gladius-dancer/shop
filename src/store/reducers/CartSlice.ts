import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../../types/CartType";

type CartState = {
  cart: CartType[];
};

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") ?? "[]")
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<CartType>) {
      state.cart.push(action.payload);
    },
    update(state, action: PayloadAction<CartType[]>) {
      state.cart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { add, update } = cartSlice.actions;
