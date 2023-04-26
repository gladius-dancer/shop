import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingType } from "../../models/ShippingType";

type ShippingState = {
  shipping: ShippingType;
};

const initialState: ShippingState = {
  shipping: { extra: 4.99, standart: 1.99, personal: 0, current: "personal" },
};

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipping(state, action: PayloadAction<string>) {
      state.shipping.current = action.payload;
    },
  },
});

export default shippingSlice.reducer;
export const { setShipping } = shippingSlice.actions;
