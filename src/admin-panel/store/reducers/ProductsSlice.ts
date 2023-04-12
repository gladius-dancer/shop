import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductType} from "../../types/ProductType";

type ProductsState = {
    products: ProductType[];
}

const initialState: ProductsState = {
    products: []
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts(state, action: PayloadAction<ProductType[]>) {
            state.products = action.payload
        }
    }
})

export default productsSlice.reducer;