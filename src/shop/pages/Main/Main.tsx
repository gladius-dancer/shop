import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import Categories from "../../components/Categories/Categories";
import ProductList from "../../components/ProductList/ProductList";
import {useNavigate} from "react-router-dom";
import {useIsAuthorized} from "../../hooks/useIsAuthorized";
import {ProductType} from "../../types/ProductType";
import Discount from "../../components/Discount/Discount";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";

function Main() {
    const dispatch = useAppDispatch()
    const nav = useAppSelector(state => state.navReducer);
    const products = useAppSelector(state => state.productsReduser.products);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const isAuth = useIsAuthorized();
    const [currentProduct, setSetCurrentProduct] = useState <any>({});

    const addToCart = (id: number) => {
        // if (isAuth) {
        //     // notifyAddProduct();
        //     const product = products.filter((item: any) => item.id === id)[0];
        //     // const founded = cart.find((item: any) => item.id === id);
        //     Boolean(founded) ?
        //         dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? {
        //             ...item,
        //             count: item.count + 1
        //         } : item))) :
        //         dispatch(addProductAction({...product, count: 1, totalPrice: product.price}));
        //     setModal(false);
        // } else {
        //     return navigate("/login");
        // }
    };

    const showDetails = (id: number) => {
        setModal(true);
        const current:ProductType = products.filter((product:ProductType) => product.id === id)[0];
        setSetCurrentProduct(current);
    };

    // useEffect(() => {
    //     dispatch(fetchProducts(currentPage * 10 - 10));
    // }, [currentPage]);

    return (
        <div>
            <Categories/>
            <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
                <Header/>
                <Discount/>
                <Carousel/>
                <div className="container mt-50">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_heading text-center">
                                <h2>Our products</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList
                    products={products}
                    showDetails={showDetails}
                    addToCart={addToCart}
                    currentPage={5}
                    handleChange={""}
                />
                <Footer/>
            </div>
        </div>
    );
}

export default Main;