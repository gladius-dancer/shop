import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import Categories from "../../../components/Categories/Categories";
import ProductList from "../../../components/ProductList/ProductList";
import { useNavigate } from "react-router-dom";
import { useIsAuthorized } from "../../../hooks/useIsAuthorized";
import { ProductType } from "../../../types/ProductType";
import Discount from "../../../components/Discount/Discount";
import Carousel from "../../../components/Carousel/Carousel";
import Footer from "../../../components/Footer/Footer";
import { add, update } from "../../../store/reducers/CartSlice";
import { setPrice } from "../../../store/reducers/PriceSlice";
import { CartType } from "../../../types/CartType";
import ModalComponent from "../../../components/Modal/ModalComponent";
import QuickView from "../../../components/QuickView/QuickView";
import { ToastContainer } from "react-toastify";
import { Notification } from "../../../utils/notification";

function Main() {
  const dispatch = useAppDispatch();
  const nav = useAppSelector((state) => state.navReducer);
  const products = useAppSelector((state) => state.productsReduser.products);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const isAuth = useIsAuthorized();
  const [currentProduct, setSetCurrentProduct] = useState<any>({});
  const cart = useAppSelector((state) => state.cartReduser.cart);
  let notify = new Notification();

  const addToCart = (id: number) => {
    if (isAuth) {
      notify.showSuccess("Product added");
      const product = products.filter((item: CartType) => item.id === id)[0];
      const founded = cart.find((item: any) => item.id === id);
      Boolean(founded)
        ? dispatch(
            update(
              cart.map((item: CartType) =>
                item.id === id
                  ? {
                      ...item,
                      count: item.count ? item.count + 1 : 1,
                      totalPrice: item.count
                        ? (item.count + 1) * item.price
                        : item.price,
                    }
                  : item
              )
            )
          )
        : dispatch(add({ ...product, count: 1, totalPrice: product.price }));
      setModal(false);
    } else {
      return navigate("/login");
    }
  };

  const showDetails = (id: number) => {
    setModal(true);
    const current: ProductType = products.filter(
      (product: ProductType) => product.id === id
    )[0];
    setSetCurrentProduct(current);
  };

  const priceCalc = () => {
    const totalPrice = cart.reduce((summ: number, current: any) => {
      return summ + current.price * current.count;
    }, 0);

    dispatch(setPrice({ totalPrice: totalPrice, shipping: 0 }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    priceCalc();
  }, [cart]);

  return (
    <div>
      <ToastContainer />
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <Discount />
        <Carousel />
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
          currentPage={1}
          handleChange={""}
        />
        <Footer />
      </div>
      <ModalComponent
        isOpen={modal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <QuickView
          id={currentProduct.id}
          image={currentProduct.images ? currentProduct.images[0].image_path:""}
          title={currentProduct.name}
          price={currentProduct.price}
          description={currentProduct.description}
          setModal={setModal}
          addToCart={addToCart}
          link="/details"
        />
      </ModalComponent>
    </div>
  );
}

export default Main;
