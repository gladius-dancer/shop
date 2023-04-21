import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { FeedbackType } from "../types/FeedbackType";

export const feedbackAPI = createApi({
    reducerPath: "feedbackAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce.icedev.uz" }),
    tagTypes: ["Feedbacks"],
    endpoints: (build) => ({
        fetchAllFeedback: build.query<FeedbackType[], string>({
            query: () => ({
                url: "/call_orders",
            }),
            providesTags: (result) => ["Feedbacks"],
        }),

        createFeedback: build.mutation<FeedbackType, FeedbackType>({
            query: (product) => ({
                url: "/call_orders",
                method: "POST",
                body: product,
                headers: {
                    'Content-type': 'application/json'
                },
            }),
            invalidatesTags: ['Feedbacks']
        }),

        deleteFeedback: build.mutation<string, string>({
            query: (id) => ({
                url: `/call_orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Feedbacks']
        }),


    }),
});
