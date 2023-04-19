import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import navReducer from "./reducers/NavSlice";
import categoriesReduser from "./reducers/CategorySlice";
import productsReduser from "./reducers/ProductsSlice";
import cartReduser from "./reducers/CartSlice";
import priceReduser from "./reducers/PriceSlice";
import favoriteReduser from "./reducers/FavoriteSlice";
import shippingReduser from "./reducers/ShippingSlice";
import ordersReduser from "./reducers/OrdersSlice";
import { productAPI } from "../services/ProductService";
import { categoryAPI } from "../services/CategoryServices";

const rootReducer = combineReducers({
  authReducer,
  navReducer,
  categoriesReduser,
  cartReduser,
  priceReduser,
  favoriteReduser,
  shippingReduser,
  ordersReduser,
  [productAPI.reducerPath]: productAPI.reducer,
  // [categoryAPI.reducerPath]: categoryAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(productAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
