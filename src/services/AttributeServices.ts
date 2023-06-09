import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AttributeType } from "../models/AttributeType";

export const attributeAPI = createApi({
  reducerPath: "attributeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Attributes"],
  endpoints: (build) => ({
    fetchCategoryAttributes: build.query<any, string>({
      query: (id) => ({
        url: `/categories/${id}/attributes`,
      }),
      providesTags: (result) => ["Attributes"],
    }),
    createAttribute: build.mutation<AttributeType, AttributeType>({
      query: (attribute) => ({
        url: "/attributes",
        method: "POST",
        body: attribute,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Attributes"],
    }),
    updateAttribute: build.mutation<AttributeType, any>({
      query: (data) => {
        const { id, attribute } = data;
        return {
          url: `/attributes/${id}`,
          method: "PUT",
          body: attribute,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["Attributes"],
    }),
    deleteAttribute: build.mutation<number, number>({
      query: (id) => ({
        url: `/attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attributes"],
    }),
  }),
});
