import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state) {
      return (state = true);
    },
    hideModal(state) {
      return (state = false);
    },
  },
});

export default modalSlice.reducer;
export const { showModal } = modalSlice.actions;
export const { hideModal } = modalSlice.actions;
