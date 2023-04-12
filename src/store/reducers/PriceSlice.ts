import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PriceType } from "../../types/PriceType";

type PriceState = {
  price: PriceType;
};

const initialState: PriceState = {
  price: { totalPrice: 0, shipping: 0 },
};

export const cartSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice(state, action: PayloadAction<PriceType>) {
      state.price = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setPrice } = cartSlice.actions;
