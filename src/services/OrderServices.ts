import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { OrderType } from "../models/OrderType";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    fetchAllOrders: build.query<OrderType[], string>({
      query: () => ({
        url: "/orders",
      }),
      providesTags: (result) => ["Orders"],
    }),

    createOrder: build.mutation<any, any>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrder: build.mutation<any, any>({
      query: (data) => {
        const { user_id, order_id } = data;
        return {
          url: `/orders/${user_id}/${order_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Orders"],
    }),

    updateOrder: build.mutation<any, any>({
      query: (data) => {
        const { id, order } = data;
        return {
          url: `/orders/${id}`,
          method: "PUT",
          body: order,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});
