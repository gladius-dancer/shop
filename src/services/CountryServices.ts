import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CountryType } from "../models/CountryType";

export const countryAPI = createApi({
  reducerPath: "countryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
  tagTypes: ["Country"],
  endpoints: (build) => ({
    fetchAllCountry: build.query<CountryType[], string>({
      query: () => ({
        url: "/countries",
      }),
      providesTags: (result) => ["Country"],
    }),
    createCountry: build.mutation<CountryType, CountryType>({
      query: (country) => ({
        url: "/countries",
        method: "POST",
        body: country,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Country"],
    }),
    updateCountry: build.mutation<CountryType, any>({
      query: (data) => {
        const { id, country } = data;
        return {
          url: `/countries/${id}`,
          method: "PUT",
          body: country,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["Country"],
    }),
    deleteCountry: build.mutation<string, string>({
      query: (id) => ({
        url: `/countries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Country"],
    }),
  }),
});
