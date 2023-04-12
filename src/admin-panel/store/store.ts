import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthSlice";
import navReducer from "./reducers/NavSlice";
import categoriesReduser from "./reducers/CategorySlice";
import productsReduser from "./reducers/ProductsSlice";

console.log(authReducer)

const rootReducer = combineReducers({
    authReducer,
    navReducer,
    categoriesReduser,
    productsReduser

})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
