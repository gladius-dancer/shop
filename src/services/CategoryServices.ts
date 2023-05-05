import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CategoryType } from "../models/CategoryType";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    fetchAllCategories: build.query<CategoryType[], string>({
      query: () => ({
        url: "/categories",
      }),
      providesTags: (result) => ["Category"],
    }),
    createCategory: build.mutation<CategoryType, CategoryType>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation<CategoryType, any>({
      query: (data) => {
        const { id, category } = data;
        return {
          url: `/categories/${id}`,
          method: "PUT",
          body: category,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation<number, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
