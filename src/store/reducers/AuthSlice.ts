import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  status: boolean;
  authStatus: boolean;
  error: string;
}

const initialState: UserState = {
  status: false,
  authStatus: JSON.parse(localStorage.getItem("authStatus") || "{}"),
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.status = true;
    },
    loginSuccess(state, action: PayloadAction<boolean>) {
      state.status = false;
      state.error = "";
      state.authStatus = action.payload;
      localStorage.setItem("authStatus", JSON.stringify("true"));
    },
    loginError(state, action) {
      state.status = false;
      state.error = action.payload;
      localStorage.setItem("authStatus", JSON.stringify("false"));
    },
  },
});

export default authSlice.reducer;
