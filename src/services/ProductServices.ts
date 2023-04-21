import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ProductType } from "../types/ProductType";
import { ProductSendType } from "../types/ProductSendType";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<ProductType[], string>({
      query: () => ({
        url: "/products",
      }),
      providesTags: (result) => ["Products"],
    }),

    fetchLimitedProducts: build.query<ProductType[], number>({
      query: (limit: number) => ({
        url: "/products",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Products"],
    }),

    createProduct: build.mutation<ProductSendType, ProductSendType>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<string, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<ProductSendType, ProductSendType>({
      query: (data) => {
        const {id, product} = data;
        console.log(data)
        return {
          url: `/products/${id}`,
              method: "PUT",
            body: product,
            headers: {
          "Content-type": "application/json",
        }
        }

      },
      invalidatesTags: ["Products"],
    }),
  }),
});
