import * as React from "react";
import images from "../../assets";
import "./Footer.scss";
import { InputText } from "../FormComponents/InputText";
import { MultiLine } from "../FormComponents/MultiLine";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallbackForm } from "./hook/useCallbackForm";
import { TimePicker } from "../FormComponents/TimePicker";

function Footer() {
  const {
    methods: { control },
    onSubmit,
    errors,
  } = useCallbackForm();

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
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="src/components/Footer/Footer#">About</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Blog</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Faq</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Returns</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="single_footer_area">
              <ul className="footer_widget_menu">
                <li>
                  <a href="src/components/Footer/Footer#">My Account</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Shipping</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Our Policies</a>
                </li>
                <li>
                  <a href="src/components/Footer/Footer#">Afiliates</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="single_footer_area">
              <div className="footer_heading mb-30">
                <h6>Feedback</h6>
              </div>
              <div className="subscribtion_form">
                <form onSubmit={onSubmit} className="feedback-form">
                  <div className="feedback-form-top">
                    <InputText
                      key="full_name"
                      name="full_name"
                      control={control}
                      status={true}
                      label="Name"
                      fullWith={false}
                    />
                    <InputText
                      key="phone_number"
                      name="phone_number"
                      control={control}
                      status={true}
                      label="Number"
                      fullWith={false}
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="feedback-form-top">
                      <TimePicker
                        label="Start"
                        name="start_time"
                        control={control}
                      />
                      <TimePicker
                        label="End"
                        name="end_time"
                        control={control}
                      />
                    </div>
                  </LocalizationProvider>
                  <MultiLine
                    key="comment"
                    name="comment"
                    label="Message"
                    control={control}
                  />
                  <button className="karl-checkout-btn">Send</button>
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
                <a href="src/components/Footer/Footer#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="src/components/Footer/Footer#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="src/components/Footer/Footer#">
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
