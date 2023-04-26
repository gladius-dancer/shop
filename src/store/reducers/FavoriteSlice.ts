import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteType } from "../../models/FavoriteType";

type FavoriteState = {
  favorite: FavoriteType[];
};

const initialState: FavoriteState = {
  favorite: JSON.parse(localStorage.getItem("favorite") ?? "[]"),
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    add(state, action: PayloadAction<FavoriteType>) {
      state.favorite.push(action.payload);
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
    update(state, action: PayloadAction<FavoriteType[]>) {
      state.favorite = action.payload;
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
  },
});

export default favoriteSlice.reducer;
export const { add, update } = favoriteSlice.actions;
