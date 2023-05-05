import * as React from "react";
import "./assets/scss/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import Panel from "./pages/admin/Panel";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Users from "./components/Users/Users";
import Country from "./components/Country/Country";
import Feedback from "./components/Callback/Feedback";
import { authSlice } from "./store/reducers/AuthSlice";
import Cart from "./pages/Cart/Cart";
import { productAPI } from "./services/ProductServices";
import Loader from "./components/Loader/Loader";

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loadReduser);
  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("authStatus")) === "true"
  //     ? dispatch(authSlice.actions.loginSuccess(true))
  //     : dispatch(authSlice.actions.loginSuccess(false));
  // }, []);

  return (
    <>
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
            <Route path={"callback"} element={<Feedback />} />
          </Route>
          <Route path="*" element={<h2>Route not found</h2>} />
        </Routes>
      </BrowserRouter>
      {loading && <Loader />}
    </>
  );
};

export default App;
