import React, { useEffect } from "react";
import images from "../../assets";
import { InputText } from "../../components/FormComponents/InputText";
import "react-toastify/scss/main.scss";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useLoginForm } from "./hooks/useLoginForm";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { Notification } from "../../utils/notification";

function Login() {
  const {
    methods: { control },
    onSubmit,
    errors,
  } = useLoginForm();

  const userStatus = useIsAuthorized();
  const navigate = useNavigate();
  const notify = new Notification();

  useEffect(() => {
    if (userStatus) {
      navigate("/");
      notify.showSuccess("User successfully logged in!");
    }
  }, [userStatus]);

  return (
    <div>
      <header className="header_area">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <div className="logo pt-4 pb-4">
              <Link to="/">
                <img src={images.logo} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="login-form d-flex justify-content-center align-content-center">
        <div className="checkout_details_area mb-50 mx-auto clearfix col-md-4">
          <form onSubmit={onSubmit}>
            <div className="column">
              <div className="col-md-12 mb-3 pl-0 pr-0">
                <label htmlFor="first_name">
                  Username <span>*</span>
                </label>
                <InputText
                  key="name"
                  name="username"
                  control={control}
                  status={true}
                  fullWith={true}
                />
              </div>
              <div className="col-md-12 mb-3 pl-0 pr-0">
                <label htmlFor="last_name">
                  Password <span>*</span>
                </label>
                <InputText
                  key="password"
                  name="password"
                  control={control}
                  status={true}
                  fullWith={true}
                />
              </div>
              <button className="karl-checkout-btn">Login</button>
            </div>
          </form>
        </div>
      </section>
      <footer className="mt-20 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer_social_area text-center">
                <a href="src/pages/Login/Login#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="src/pages/Login/Login#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="src/pages/Login/Login#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
