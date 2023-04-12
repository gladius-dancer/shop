import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {ProductType} from "../../types/ProductType";

type Props = {
    products: ProductType[];
    addToCart: any;
    currentPage: number;
    handleChange: any;
    showDetails: any;
}

function ProductList({products, addToCart, currentPage, handleChange, showDetails}:Props) {
    return (
        <section className="new_arrivals_area clearfix">
            <div className="container">
                <div className="row karl-new-arrivals">
                    {products?.map((item: any) => (
                        <div key={item.id}
                             className="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig"
                             data-wow-delay="0.2s">
                            {/* ProductType Image */}
                            <div className="product-img">
                                <img src={item.images[0].image_path} alt=""/>
                                <div className="product-quicview">
                                    <p onClick={() => showDetails(item.id)} data-target="#quickview"><i
                                      className="ti-plus"></i></p>
                                </div>
                            </div>
                            {/* ProductType Description */}
                            <div className="product-description">
                                <h4 className="product-price">${item.price}</h4>
                                <p>{item.name}</p>
                                {/* Add to Cart */}
                                <p onClick={() => addToCart(item.id)} className="add-to-cart-btn">ADD TO CART</p>
                            </div>
                        </div>
                    ))}

                    <div className="col-12 mt-30 mb-30 d-flex justify-content-center">
                        <Stack spacing={2}>
                            <Pagination count={10} page={currentPage} onChange={handleChange}/>
                        </Stack>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductList;