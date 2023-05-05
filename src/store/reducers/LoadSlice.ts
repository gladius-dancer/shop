import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const loadSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoader(state) {
      return (state = true);
    },
    hideLoader(state) {
      return (state = false);
    },
  },
});

export default loadSlice.reducer;
export const { showLoader } = loadSlice.actions;
export const { hideLoader } = loadSlice.actions;
