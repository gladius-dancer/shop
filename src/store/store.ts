import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import navReducer from "./reducers/NavSlice";
import modalReducer from "./reducers/ModalSlice";
import cartReduser from "./reducers/CartSlice";
import priceReduser from "./reducers/PriceSlice";
import favoriteReduser from "./reducers/FavoriteSlice";
import shippingReduser from "./reducers/ShippingSlice";
import loadReduser from "./reducers/LoadSlice";
import { productAPI } from "../services/ProductServices";
import { categoryAPI } from "../services/CategoryServices";
import { callbackAPI } from "../services/CallbackServices";
import { userAPI } from "../services/UserServices";
import { countryAPI } from "../services/CountryServices";
import { attributeAPI } from "../services/AttributeServices";
import { orderAPI } from "../services/OrderServices";

const rootReducer = combineReducers({
  authReducer,
  navReducer,
  modalReducer,
  cartReduser,
  priceReduser,
  favoriteReduser,
  shippingReduser,
  loadReduser,
  [productAPI.reducerPath]: productAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [callbackAPI.reducerPath]: callbackAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [countryAPI.reducerPath]: countryAPI.reducer,
  [attributeAPI.reducerPath]: attributeAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productAPI.middleware)
        .concat(categoryAPI.middleware)
        .concat(callbackAPI.middleware)
        .concat(userAPI.middleware)
        .concat(countryAPI.middleware)
        .concat(attributeAPI.middleware)
        .concat(orderAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
