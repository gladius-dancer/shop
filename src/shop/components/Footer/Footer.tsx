import * as React from "react";
import images from "../../assets";
import "./Footer.scss";
import { InputText } from "../FormComponents/InputText";
import {useFeedbackForm} from "./hooks/useSendFeedback";

function Footer() {

  const {methods: {control}, onSubmit, errors} = useFeedbackForm()

  return (
    <footer className="footer_area">
      <div className="container">
        <div className="row">
          {/* Single Footer Area Start */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="single_footer_area">
              <div className="footer-logo">
                <img src={images.logo} alt="" />
              </div>
              <div className="copywrite_text d-flex align-items-center">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script>
                  All rights reserved | Made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>{" "}
                  &amp; distributed by{" "}
                  <a href="https://themewagon.com" target="_blank">
                    ThemeWagon
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
          {/* Single Footer Area Start */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="src/shop/components/Footer/Footer#">About</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Blog</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Faq</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Returns</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Single Footer Area Start */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="src/shop/components/Footer/Footer#">My Account</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Shipping</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Our Policies</a>
                </li>
                <li>
                  <a href="src/shop/components/Footer/Footer#">Afiliates</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Single Footer Area Start */}
          <div className="col-12 col-lg-5">
            <div className="single_footer_area">
              <div className="footer_heading mb-30">
                <h6>Feedback</h6>
              </div>
              <div className="subscribtion_form">
                <form onSubmit={onSubmit}>
                  <InputText
                    key="name"
                    name="name"
                    control={control}
                    status={true}
                    label="Name"
                    size="small"
                    fullWith={false}

                  />
                  <InputText
                      key="number"
                      name="number"
                      control={control}
                      status={true}
                      label="Number"
                      size="small"
                      fullWith={false}
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>

        {/* Footer Bottom Area Start */}
        <div className="footer_bottom_area">
          <div className="row">
            <div className="col-12">
              <div className="footer_social_area text-center">
                <a href="src/shop/components/Footer/Footer#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="src/shop/components/Footer/Footer#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="src/shop/components/Footer/Footer#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
