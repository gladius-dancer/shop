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
  }),
});
