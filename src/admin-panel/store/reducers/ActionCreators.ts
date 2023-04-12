import {AppDispatch} from "../store";
import axios from "axios";
import {authSlice} from "./AuthSlice";
import {categoriesSlice} from "./CategorySlice";
import {productsSlice} from "./ProductsSlice";
import {LoginType} from "../../types/LoginType";

export const login = (data: LoginType)=> async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.login())
        const response = await axios.post(
            "https://ecommerce.icedev.uz/token",
            {
                username: data.username,
                password: data.password
            },
            {
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })
            localStorage.setItem("token", JSON.stringify(response.data));
            dispatch(authSlice.actions.loginSuccess(true))
    } catch (e: any) {
        dispatch(authSlice.actions.loginError(e.message))
    }
}

export const getCategories = ()=> async (dispatch: AppDispatch)=>{
    try{
        const response = await axios.get("https://ecommerce.icedev.uz/categories");
        dispatch(categoriesSlice.actions.setCategories(response.data))
    }
    catch(e){

    }
}

export const getProducts = ()=> async (dispatch: AppDispatch)=>{
    try{
        const response = await axios.get("https://ecommerce.icedev.uz/products/");
        dispatch(productsSlice.actions.getProducts(response.data))
    }
    catch(e){

    }
}