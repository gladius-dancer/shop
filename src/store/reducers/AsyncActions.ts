import { AppDispatch } from "../store";
import axios from "axios";
import { authSlice } from "./AuthSlice.ts";
import { LoginType } from "../../models/LoginType";
import { Notification } from "../../utils/notification";

const notify = new Notification();

const $api = axios.create({
  baseURL: "https://ecommerce.icedev.uz",
});

export const login = (data: LoginType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.login());

    const response = await $api.post(
      "https://ecommerce.icedev.uz/token",
      {
        username: data.username,
        password: data.password,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    localStorage.setItem("token", JSON.stringify(response.data));
    dispatch(authSlice.actions.loginSuccess(true));
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.message));
  }
};
