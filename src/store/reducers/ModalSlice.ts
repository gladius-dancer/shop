import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    change(state) {
      return !state;
    },
  },
});

export default modalSlice.reducer;
export const { change } = modalSlice.actions;
