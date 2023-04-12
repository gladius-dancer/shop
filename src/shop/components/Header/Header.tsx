import * as React from "react";
import images from "../../assets";
import {Link} from "react-router-dom";
import "./Header.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/scss/main.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {change} from "../../store/reducers/NavSlice";

export default function Header() {

    const dispatch = useAppDispatch()

    const logout = () => {
        localStorage.removeItem("token");
        toast.info('User succesfully logout!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <header className="header_area">
            <ToastContainer/>
            <div className="top_header_area">
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-end">
                        <div className="col-12">
                            <div className="top_single_area d-flex justify-content-between">
                                <div className="top_logo">
                                    <Link to={"/"}><img src={images.logo} alt=""/></Link>
                                </div>

                                <div className="header-cart-menu card-menu">
                                    <div className="cart">
                                        <Link to={"/cart"} id="header-cart-btn">
                                        <span className="cart_quantity"></span>
                                            <i className="ti-heart"></i> <label className="favorite">Favorites</label>
                                            {/*$ {parseFloat(price.totalPrice).toFixed(2)}*/}
                                        </Link>
                                    </div>
                                    <div className="cart">
                                        <Link to={"/cart"} id="header-cart-btn">
                                            <span className="cart_quantity"></span>
                                            <i className="ti-bag"></i> <label className="bag">Your Bag</label>
                                            {/*$ {parseFloat(price.totalPrice).toFixed(2)}*/}
                                        </Link>
                                    </div>

                                    <div className="help-line">

                                        {/*<Link to={"/profile"}>*/}
                                        {/*    <div className="userAvatar"*/}
                                        {/*         style={{backgroundImage: `url()`}}/>*/}
                                        {/*    <p className="userName">*/}
                                        {/*        User*/}
                                        {/*    </p>*/}
                                        {/*</Link>*/}
                                        {/*<div className="logout" onClick={() => logout()}>*/}
                                        {/*    Logout*/}
                                        {/*</div>*/}
                                        <Link to={"/login"}>
                                            <i className="ti-user"></i> Login
                                        </Link>
                                    </div>

                                    <div className="header-right-side-menu ml-15" onClick={()=>dispatch(change())}>
                                        <span id="sideMenuBtn">
                                            <i className="ti-menu" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            {/* Menu Area */}
                            <div className="main-menu-area">
                                <nav className="navbar navbar-expand-lg align-items-start">

                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#karl-navbar"
                                            aria-controls="karl-navbar" aria-expanded="false"
                                            aria-label="Toggle navigation"><span
                                        className="navbar-toggler-icon"><i className="ti-menu"></i></span></button>

                                    <div className="collapse navbar-collapse align-items-start collapse"
                                         id="karl-navbar">
                                        <ul className="navbar-nav animated" id="nav">
                                            <li className="nav-item active"><a className="nav-link" href="">Home</a></li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="" id="karlDropdown"
                                                   role="button"
                                                   data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">Pages</a>
                                                <div className="dropdown-menu" aria-labelledby="karlDropdown">
                                                    <a className="dropdown-item" href="">Home</a>
                                                    <a className="dropdown-item" href="shop.html">Shop</a>
                                                    <a className="dropdown-item" href="cart.html">Cart</a>
                                                    <a className="dropdown-item" href="checkout.html">Checkout</a>
                                                </div>
                                            </li>
                                            <li className="nav-item"><a className="nav-link" href="">Contact</a></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}