import * as React from "react";
import "./assets/scss/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import { useAppSelector } from "./hooks/useRedux";
import Panel from "./pages/admin/Panel";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Users from "./components/Users/Users";
import Country from "./components/Country/Country";
import Feedback from "./components/Callback/Feedback";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Loader from "./components/Loader/Loader";
import { useIsAuthorized } from "./hooks/useIsAuthorized";

Modal.setAppElement("#root");

const App = () => {
  const loading = useAppSelector((state) => state.loadReduser);
  const isAuth = useIsAuthorized();
  console.log(isAuth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/checkout"} element={<Checkout />} />
          {isAuth && (
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
          )}

          <Route path="*" element={<h2>Route not found</h2>} />
        </Routes>
      </BrowserRouter>
      {loading && <Loader />}
    </>
  );
};

export default App;
