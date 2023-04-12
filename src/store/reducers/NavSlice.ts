import { createSlice} from "@reduxjs/toolkit";

const initialState: boolean = false;

export const navSlice= createSlice({
    name: "nav",
    initialState,
    reducers:{
        change(state){
            return !state
        }
    }
})

export default navSlice.reducer;
export const {change} = navSlice.actions;