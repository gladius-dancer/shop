import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../../types/CartType";

type CartState = {
  cart: CartType[];
};

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "") || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<CartType>) {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    update(state, action: PayloadAction<CartType[]>) {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export default cartSlice.reducer;
export const { add, update } = cartSlice.actions;
