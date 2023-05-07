import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import { InputText } from "../../components/FormComponents/InputText";
import { InputCheckbox } from "../../components/FormComponents/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setPrice } from "../../store/reducers/PriceSlice";
import { useLoginForm } from "../Login/hooks/useLoginForm";

function Checkout() {
  const dispatch = useAppDispatch();
  const nav = useAppSelector((state) => state.navReducer);
  const cart = useAppSelector((state) => state.cartReduser);
  const price: any = useAppSelector((state) => state.priceReduser.price);
  const shipping: any = useAppSelector(
    (state) => state.shippingReduser.shipping
  );

  const [cash, setCash] = useState(false);
  const [terms, setTerms] = useState(false);
  const [cashError, setCashError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [paypal, setPaypal] = useState(true);
  const [card, setCard] = useState(false);

  const [expanded, setExpanded] = React.useState<string | boolean>("1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const priceCalc = () => {
    const totalPrice = cart?.reduce((summ: number, current: any) => {
      return summ + current.price * current.count;
    }, 0);

    dispatch(setPrice({ totalPrice: totalPrice, shipping: 0 }));
    return totalPrice;
  };

  const {
    methods: { control },
    onSubmit,
    errors,
  } = useLoginForm();

  useEffect(() => {
    if (expanded === "1") {
      setPaypal(true);
      setCard(false);
      setCash(true);
    } else if (expanded === "2") {
      setPaypal(false);
      setCard(true);
      setCash(true);
    } else {
      setPaypal(false);
      setCard(false);
      setCash(false);
    }
  }, [expanded]);

  const termsChange = (event: any) => {
    setTerms(event.target.checked);
    setTermsError(false);
  };

  const setCashMethod = (event: any) => {
    setCash(event.target.checked);
    setCashError(false);
  };

  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <div className="checkout_area mt-80 mb-50">
          <div className="container">
            <div className="d-flex justify-content-around flex-wrap">
              <div className="col-12 col-md-6">
                <div className="checkout_details_area clearfix">
                  <div className="cart-page-heading">
                    <h5>Billing Address</h5>
                  </div>
                  <div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="col-12 mb-3 d-flex flex-column">
                      <label htmlFor="country">Country</label>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="street_address">Address</label>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="postcode">Postcode</label>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="phone_number">Phone No</label>
                    </div>
                    <div className="col-12 mb-4">
                      <label htmlFor="email_address">Email Address</label>
                    </div>

                    <div className="col-12">
                      <div className="custom-control custom-checkbox d-flex align-items-center mb-1">
                        <InputCheckbox
                          key="terms"
                          name="terms"
                          control={control}
                          label="Terms and conitions"
                          checked={terms}
                          onChange={termsChange}
                          error={termsError}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form
                // onSubmit={handleSubmit(onSubmit)}
                action="#"
                method="post"
              >
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="order-details-confirmation">
                    <div className="cart-page-heading">
                      <h5>Your Order</h5>
                      <p>The Details</p>
                    </div>
                    <ul className="order-details-form mb-4">
                      <li>
                        <span>Product</span> <span>Price</span>
                      </li>
                      <li>
                        <span>Subtotal</span>{" "}
                        <span>
                          $ {parseFloat(price?.totalPrice).toFixed(2)}
                        </span>
                      </li>
                      <li>
                        <span>Shipping</span>
                        <span>
                          {shipping?.[shipping?.current] > 0
                            ? shipping?.[shipping?.current]
                            : "Free"}
                        </span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span>
                          ${" "}
                          {parseFloat(
                            price?.totalPrice + shipping?.[shipping?.current]
                          ).toFixed(2)}
                        </span>
                      </li>
                    </ul>

                    <div className="mb-30">
                      <Accordion
                        expanded={expanded === "1"}
                        onChange={handleChange("1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>PAYPAL</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <InputText
                            key="paypal"
                            status={true}
                            name="paypal"
                            control={control}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "2"}
                        onChange={handleChange("2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>CREDIT CARD</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <InputText
                            key="card"
                            status={true}
                            name="card"
                            control={control}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "3"}
                        onChange={handleChange("3")}
                      >
                        <AccordionSummary
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>CASH ON DELIEVERY</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <InputCheckbox
                            key="cash"
                            name="cash"
                            control={control}
                            label="I agree to pay in cash"
                            checked={cash}
                            onChange={setCashMethod}
                            error={cashError}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <button type="submit" className="btn karl-checkout-btn">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
