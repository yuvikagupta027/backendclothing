import React, { useEffect, useState } from 'react';
import { FaStar, FaMinus, FaPlus, FaShippingFast, FaShoppingBag } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";
import { IoWalletOutline } from 'react-icons/io5';
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Newsletter from './Newsletter';
import Footer from './Footer';

export default function Viewproduct() {

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("Black");
    const [selectedSize, setSelectedSize] = useState("M");
    const [product, setProduct] = useState(null);
    const [opn, setopn] = useState(false);
    const [lod, setlod] = useState(false);
    const [cartt, setcartt] = useState([]);

    const location = useLocation();
    const productId = new URLSearchParams(location.search).get("id");

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Black", "White"];

    useEffect(() => {
        axios
            .post("https://backendclothing-3.onrender.com/fetchproducts")
            .then((res) => {
                const allProducts = res.data;
                const foundProduct = allProducts.find((p) => p._id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            })
            .catch((err) => console.error("Error fetching product:", err));
    }, [productId]);

    useEffect(() => {
        fetchcart();
    }, []);

    function handleQuantity(type) {
        setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
    }

    function addtocart(row) {
        setlod(true);
        const userId = localStorage.getItem("userlogin");

        if (!userId) {
            alert("Please login first to add items to your cart.");
            setlod(false);
            return;
        }

        const { _id, ...rest } = row;
        const cartItem = {
            ...rest,
            CartValue: quantity,
            userId: userId,
            selectedSize: selectedSize
        };

        axios
            .post("https://backendclothing-3.onrender.com/addtocart", cartItem)
            .then((succ) => {
                if (succ.data === "ok") {
                    alert("Item added successfully");
                    fetchcart();
                    setopn(true);
                    setlod(false);
                }
            })
            .catch((err) => {
                console.error("Error adding to cart:", err);
                setlod(false);
            });
    }

    function fetchcart() {
        const userId = localStorage.getItem("userlogin");
        axios
            .post("https://backendclothing-3.onrender.com/fetchcart", { userId })
            .then((succ) => {
                setcartt(succ.data);
            });
    }

    if (!product) {
        return <div className="text-center mt-5">Loading product...</div>;
    }

    return (
        <>
            <div className="container-fluid shop-page p-0">
                <Navbar />
                <div className="container product-detail-container my-5">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <img
                                src={product.Images}
                                alt={product.Productname}
                                className="img-fluid rounded"
                                style={{ width: "65%", margin: "auto", display: "block" }}
                            />
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <h4>{product.Productname}</h4>
                            <div className="price-block mb-2">
                                <span className="text-danger h5 me-2">Rs. {product.Price}</span>
                            </div>

                            <div className="mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-warning" />
                                ))}
                                <span className="ms-2 text-muted">(260)</span>
                            </div>

                            <div className="mt-4">
                                <h6>Size</h6>
                                <div className="d-flex gap-2 flex-wrap">
                                    {(product?.Size || []).map((size) => (
                                        <button
                                            key={size}
                                            className={`btn size-btn ${selectedSize === size ? 'active' : ''}`}
                                            disabled={size === 'XXL'} // or use product.SizeDisabled if available
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                {/* <a href="#" className="d-block mt-2 text-decoration-underline">Size Chart</a> */}
                            </div>

                            <div className="mt-4">
                                <h6>Quantity:</h6>
                                <div className="input-group quantity-group w-50">
                                    <button className="btn btn-outline-secondary" onClick={() => handleQuantity('dec')}>
                                        <FaMinus />
                                    </button>
                                    <input type="text" className="form-control text-center" value={quantity} readOnly />
                                    <button className="btn btn-outline-secondary" onClick={() => handleQuantity('inc')}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                            <p className="text-muted fst-italic mt-3">Only 4 pieces in stock!</p>

                            <div className="mt-3 d-flex align-items-center">
                                <FaShippingFast className="me-2" />
                                <span>Ships in 24 hours</span>
                            </div>
                            <div className="mt-3 d-flex align-items-center">
                                <IoWalletOutline className="me-2 text-dark" />
                                <span>Cash On Delivery Available</span>
                            </div>
                            <div className="mt-3 d-flex align-items-center">
                                <FaShippingFast className="me-2" />
                                <span>Paid Express Shipping available</span>
                            </div>

                            <div className="row text-center mb-4 shipping-stats mt-3">
                                <div className="col">
                                    <div className="circle-icon">
                                        <FaClockRotateLeft className="text-light fw-bold" />
                                    </div>
                                    <div><strong>Order within</strong></div>
                                    <div className="text-muted small">16H 19M 46S</div>
                                </div>
                                <div className="col">
                                    <div className="circle-icon">
                                        <FaShippingFast className="text-light fw-bold" />
                                    </div>
                                    <div><strong>Ships</strong></div>
                                    <div className="text-muted small">Tomorrow</div>
                                </div>
                                <div className="col">
                                    <div className="circle-icon">
                                        <CiLocationOn className="text-light fw-bold" />
                                    </div>
                                    <div><strong>Delivery Between</strong></div>
                                    <div className="text-muted small">2-5 days</div>
                                </div>
                            </div>

                            <button className="btn btn-dark w-100 mb-2" onClick={() => addtocart(product)}>
                                <FaShoppingBag className="mb-1" />&nbsp;
                                ADD TO BAG
                            </button>

                            {/* <div className="mb-3">
                                <label className="form-label">Estimated Delivery Date</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Enter your pincode" />
                                    <button className="btn btn-dark">CHECK</button>
                                </div>
                            </div> */}

                            <div className="offers mb-4">
                                <div className="d-flex align-items-start mb-2">
                                    <img src="https://www.alamodelabel.in/cdn/shop/files/onecard_offer_icon_0f70d9f2-a999-4996-8655-c7e63dd466b2_thumb.svg?v=1725429576"
                                        alt="OneCard" className="offer-icon me-2" />
                                    <div>
                                        <p className="mb-0 small">
                                            FLAT 5% OFF <small>(max ₹500)</small> on OneCard. Use Code:
                                            <strong> ONECARDSEP</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start">
                                    <img src="https://www.alamodelabel.in/cdn/shop/files/icons8-bhim-512_thumb.webp?v=1725429576"
                                        alt="UPI" className="offer-icon me-2" />
                                    <div>
                                        <p className="mb-0 small">
                                            Extra ₹15 instant discount on all UPI payments. No code required.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <button className="btn border border-0 w-100 text-start d-flex justify-content-between align-items-center" type="button"
                                data-bs-toggle="collapse" data-bs-target="#descCollapse" aria-expanded="false" aria-controls="descCollapse">
                                <strong>DESCRIPTION</strong>
                                <MdOutlineKeyboardArrowDown />
                            </button>
                            <div className="collapse" id="descCollapse">
                                <div className="p-3">{product.Description || "No description available."}</div>
                            </div>

                            <hr />
                            <button className="btn border border-0 w-100 text-start d-flex justify-content-between align-items-center" type="button"
                                data-bs-toggle="collapse" data-bs-target="#detailsCollapse" aria-expanded="false" aria-controls="detailsCollapse">
                                <strong>DETAILS</strong>
                                <MdOutlineKeyboardArrowDown />
                            </button>
                            <div className="collapse" id="detailsCollapse">
                                <div className="p-3">{product.Type || "No additional details provided."}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0">
                <Newsletter />
            </div>
            <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0">
                <Footer />
            </div>
        </>
    );
}
