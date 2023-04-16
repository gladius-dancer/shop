import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//@ts-ignore
import { OrderType } from "../../types/OrderType";

type OrdersState = {
    orders: OrderType[];
};

const initialState: OrdersState = {
    orders: [],
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getOrders(state, action: PayloadAction<OrderType[]>) {
            state.orders = action.payload;
        },
    },
});

export default ordersSlice.reducer;
