import * as React from "react";
import "./shop/assets/scss/style.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Modal from "react-modal";
import Main from "./shop/pages/Main/Main";
import Login from "./shop/pages/Login/Login";
import {useEffect} from "react";
import {useAppDispatch} from "./shop/hooks/useRedux";
import {getCategories, getProducts} from "./shop/store/reducers/ActionCreators";
import Panel from "./admin-panel/pages/Panel";
import Dashboard from "./admin-panel/components/Dashboard/Dashboard";
import Orders from "./admin-panel/components/Orders/Orders";

Modal.setAppElement("#root");

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/admin"} element={<Panel />}>
                    <Route path={"dashboard"} element={<Dashboard />} />
                    <Route path={"orders"} element={<Orders />} />
                </Route>
                <Route path="*" element={<h2>Route not found</h2>} />
            </Routes>
        </BrowserRouter>
    );
};


export default App;
