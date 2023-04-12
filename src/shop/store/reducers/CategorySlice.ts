import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryType} from "../../types/CategoryType"

type CategoryState = {
    categories: CategoryType[];
}

const initialState: CategoryState = {
    categories: []
}

export const categoriesSlice= createSlice({
    name: "categories",
    initialState,
    reducers:{
        setCategories(state, action: PayloadAction<CategoryType[]>){
            state.categories = action.payload
        }
    }
})

export default categoriesSlice.reducer;