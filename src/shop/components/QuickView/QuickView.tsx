import React from "react";
import "./QuickView.scss";
import { Link } from "react-router-dom";

type CurrentProductType = {
  id: number,
  image: string,
  title: string,
  price: number,
  description: string,
  link: string,
  setModal: any,
  addToCart: any
}

function QuickView(props: CurrentProductType) {
  return (
    <div className="" id="quickview" role="dialog" aria-labelledby="quickview"
         aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <button onClick={() => props.setModal(false)} type="button" className="close btn" data-dismiss="modal"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="modal-body">
            <div className="quickview_body">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-5 d-flex align-items-center">
                    <div className="quickview_pro_img">
                      <img src={props.image[0]} alt="" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-7">
                    <div className="quickview_pro_des">
                      <h5 className="title">{props.title}</h5>
                      <div className="top_seller_product_rating mb-15">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </div>
                      <h5 className="price">$ {props.price}
                        <span>$ {parseFloat(String(props.price * 130 / 100)).toFixed(2)}</span></h5>
                      <p>{(props.description) ? (props.description).split("").splice(0, 150).join("") + "..." : ""}</p>
                      <Link to={`${props.link}/${props.id}`}>View Full Product Details</Link>
                    </div>
                    <div className="cart">
                      <button onClick={() => props.addToCart(props.id)} name="addtocart"
                              className="cart-submit">Add to cart
                      </button>
                      <div className="modal_pro_wishlist">
                        <a href="wishlist.html" target="_blank"><i className="ti-heart"></i></a>
                      </div>
                      <div className="modal_pro_compare">
                        <a href="compare.html" target="_blank"><i className="ti-stats-up"></i></a>
                      </div>
                    </div>

                    <div className="share_wf mt-30">
                      <p>Share With Friend</p>
                      <div className="_icon">
                        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;