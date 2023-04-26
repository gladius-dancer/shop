import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserType, UserSendType } from "../models/UserType";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<UserType[], string>({
      query: () => ({
        url: "/users",
      }),
      providesTags: (result) => ["Users"],
    }),

    // fetchLimitedProducts: build.query<UserType[], number>({
    //   query: (limit: number) => ({
    //     url: "/products",
    //     params: {
    //       _limit: limit,
    //     },
    //   }),
    //   providesTags: (result) => ["Users"],
    // }),
    //
    createUser: build.mutation<UserSendType, UserSendType>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation<string, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: build.mutation<UserSendType, any>({
      query: (data) => {
        const { id, user } = data;
        return {
          url: `/users/${id}`,
          method: "PUT",
          body: user.user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});
