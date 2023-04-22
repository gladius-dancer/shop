import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import navReducer from "./reducers/NavSlice";
import modalReducer from "./reducers/ModalSlice";
import categoriesReduser from "./reducers/CategorySlice";
import productsReduser from "./reducers/ProductsSlice";
import cartReduser from "./reducers/CartSlice";
import priceReduser from "./reducers/PriceSlice";
import favoriteReduser from "./reducers/FavoriteSlice";
import shippingReduser from "./reducers/ShippingSlice";
import ordersReduser from "./reducers/OrdersSlice";
import { productAPI } from "../services/ProductServices";
import { categoryAPI } from "../services/CategoryServices";
import { feedbackAPI } from "../services/FeedbackServices";

const rootReducer = combineReducers({
  authReducer,
  navReducer,
  modalReducer,
  categoriesReduser,
  cartReduser,
  priceReduser,
  favoriteReduser,
  shippingReduser,
  ordersReduser,
  [productAPI.reducerPath]: productAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [feedbackAPI.reducerPath]: feedbackAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productAPI.middleware)
        .concat(categoryAPI.middleware)
        .concat(feedbackAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
