import * as React from "react";
import "./shop/assets/scss/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import Main from "./shop/pages/Main/Main";
import Login from "./shop/pages/Login/Login";
import { useEffect } from "react";
import { useAppDispatch } from "./shop/hooks/useRedux";
import { getCategories, getProducts } from "./store/reducers/ActionCreators";
import Panel from "./admin-panel/pages/Panel";
import Dashboard from "./admin-panel/components/Dashboard/Dashboard";
import Orders from "./admin-panel/components/Orders/Orders";
import Products from "./admin-panel/components/Products/Products";
import Category from "./admin-panel/components/Category/Category";
import Users from "./admin-panel/components/Users/Users";
import Country from "./admin-panel/components/Country/Country";
import Callback from "./admin-panel/components/Callback/Callback";
import { authSlice } from "./store/reducers/AuthSlice";
import Cart from "./shop/pages/Cart/Cart";

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    JSON.parse(localStorage.getItem("authStatus")) === "true"
      ? dispatch(authSlice.actions.loginSuccess(true))
      : dispatch(authSlice.actions.loginSuccess(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/admin"} element={<Panel />}>
          <Route index element={<Dashboard />} />
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"orders"} element={<Orders />} />
          <Route path={"products"} element={<Products />} />
          <Route path={"users"} element={<Users />} />
          <Route path={"category"} element={<Category />} />
          <Route path={"country"} element={<Country />} />
          <Route path={"callback"} element={<Callback />} />
        </Route>
        <Route path="*" element={<h2>Route not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
