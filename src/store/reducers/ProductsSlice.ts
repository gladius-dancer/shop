import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../types/ProductType";

interface ProductsSlice {
  isLoading: boolean,
  error: string
  products: ProductType[]
}

const initialState: ProductsSlice = {
  isLoading: false,
  error: "",
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
