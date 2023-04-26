import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CallbackType } from "../models/CallbackType";

export const callbackAPI = createApi({
  reducerPath: "callbackAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Callback"],
  endpoints: (build) => ({
    fetchAllCallbacks: build.query<CallbackType[], string>({
      query: () => ({
        url: "/call_orders",
      }),
      providesTags: (result) => ["Callback"],
    }),

    createCallback: build.mutation<CallbackType, CallbackType>({
      query: (callback) => ({
        url: "/call_orders",
        method: "POST",
        body: callback,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Callback"],
    }),

    deleteCallback: build.mutation<string, string>({
      query: (id) => ({
        url: `/call_orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Callback"],
    }),
  }),
});
