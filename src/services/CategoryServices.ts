import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CategoryType } from "../types/CategoryType";

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




    }),
});
