import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import navReducer from "./reducers/NavSlice";
import categoriesReduser from "./reducers/CategorySlice";
import productsReduser from "./reducers/ProductsSlice";
import cartReduser from "./reducers/CartSlice";
import priceReduser from "./reducers/PriceSlice";
import favoriteReduser from "./reducers/FavoriteSlice";

console.log(authReducer);

const rootReducer = combineReducers({
  authReducer,
  navReducer,
  categoriesReduser,
  productsReduser,
  cartReduser,
  priceReduser,
  favoriteReduser
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
