import { AppDispatch } from "../store";
import axios from "axios";
import { authSlice } from "./AuthSlice.ts";
import { categoriesSlice } from "./CategorySlice.ts";
import { productsSlice } from "./ProductsSlice";
import { LoginType } from "../../types/LoginType";
import { FeedbackType } from "../../types/FeedbackType";
import { ordersSlice } from "./OrdersSlice";
import { Notification } from "../../utils/notification";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductType} from "../../types/ProductType";

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
    localStorage.setItem("authStatus", JSON.stringify("true"));
    dispatch(authSlice.actions.loginSuccess(true));
  } catch (e: any) {
    dispatch(authSlice.actions.loginError(e.message));
  }
};

export const sendFeedback =
  (data: FeedbackType) => async (dispatch: AppDispatch) => {
    try {
      const response = await $api.post(
        "https://ecommerce.icedev.uz/call_orders",
        {
          full_name: data.name,
          phone_number: data.number,
          start_time: new Date(data.start).toLocaleTimeString(),
          end_time: new Date(data.end).toLocaleTimeString(),
          comment: data.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e: any) {}
  };

export const getCategories = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get("https://ecommerce.icedev.uz/categories");
    dispatch(
      categoriesSlice.actions.setCategories(
        response.data.filter((item) => item.children_category.length > 0)
      )
    );
  } catch (e) {}
};



export const getOrders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await $api.get("https://ecommerce.icedev.uz/orders");
    dispatch(ordersSlice.actions.getOrders(response.data));
  } catch (e) {}
};



