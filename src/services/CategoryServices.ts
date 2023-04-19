import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {CategoryType} from "../types/CategoryType";

export const categoryAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
    tagTypes: ["Category"],
    endpoints: (build) => ({
        fetchAllCategory: build.query<CategoryType[], string>({
            query: () => ({
                url: "/categories",
            }),
            providesTags: (result) => ["Category"],
        }),
    }),
});
