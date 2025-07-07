import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function Cart() {
    const [cartt, setcartt] = useState([]);
    const [totalam, settotalam] = useState(0);
    // const shipping = 20;
    const shipping = totalam > 0 && totalam < 5000 ? 20 : 0;
    const grandTotal = totalam + shipping;
    const navigate = useNavigate();

    const fetchcart = () => {
        const userId = localStorage.getItem("userlogin");
        axios
            .post("https://backendclothing-3.onrender.com/fetchcart", { id: userId })
            .then((res) => setcartt(res.data))
            .catch((err) => console.error("Error fetching cart:", err));
    };

    const incre = (id) => {
        axios.post("https://backendclothing-3.onrender.com/increasecart", { _id: id }).then(fetchcart);
    };

    const decre = (id) => {
        axios.post("https://backendclothing-3.onrender.com/decreasecart", { _id: id }).then(fetchcart);
    };

    const deletee = (id) => {
        axios.post("https://backendclothing-3.onrender.com/deleteitem", { Id: id }).then((res) => {
            if (res.data === "ok") {
                alert("Item deleted successfully");
                fetchcart();
            }
        });
    };

    const calculate = () => {
        const newTotal = cartt.reduce((sum, item) => sum + item.CartValue * item.Price, 0);
        settotalam(newTotal);
    };

    const handleContinue = () => {
        navigate("/Billingaddress");
    };

    useEffect(() => {
        fetchcart();
    }, []);

    useEffect(() => {
        calculate();
    }, [cartt]);

    return (
        <>
            <marquee direction="" className="py-3 w-100 bgmarquee">
                <Typography variant="h5" className="text-dark" fontFamily={"cursive"}>
                    Style in your cart. Confidence on the way. Complete your Rollistear look.
                </Typography>
            </marquee>

            <Navbar />

            <div className="cart-container container">
                <h2 className="cart-title mt-3">Your cart</h2>

                <div className="table-responsive">
                    <table className="table cart-table border-top border-bottom">
                        <tbody>
                            {cartt.length > 0 ? (
                                cartt.map((row) => (
                                    <table className="table cart-table border-bottom" key={row._id}>
                                        <thead>
                                            <tr>
                                                <th className="text-start">Product</th>
                                                <th className="text-center">Quantity</th>
                                                <th className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="align-middle">
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={row.Images}
                                                            alt="Product"
                                                            style={{ width: "80px", height: "auto" }}
                                                            className="me-3"
                                                        />
                                                        <div>
                                                            <p className="mb-1 fw-semibold">{row.Productname}</p>
                                                            <p className="mb-1 text-muted">₹{row.Price}</p>
                                                            <p className="mb-0 text-muted">Size: {row.selectedSize}</p>
                                                            {/* <p className="mb-0 text-muted">Color: {row.selectedColor}</p> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div className="btn-group">
                                                            <button disabled={row.CartValue <= 1} className="btn btn-sm btn-outline-warning" onClick={() => decre(row._id)}>
                                                                <FaMinus size={15} />
                                                            </button>
                                                            <button className="btn btn-sm btn-light" disabled>
                                                                {row.CartValue}
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-warning" onClick={() => incre(row._id)}>
                                                                <FaPlus size={15} />
                                                            </button>
                                                        </div>
                                                        <button className="btn text-warning float-end" onClick={() => deletee(row._id)}>
                                                            <MdDelete size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-end fw-semibold">
                                                    ₹ {(row.CartValue * row.Price).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))
                            ) : (
                                <div className=" my-5 w-100 text-muted text-center">
                                    <p className="fs-5">Your cart is empty.</p>
                                    <button className="btn btn-outline-secondary mt-2" onClick={() => navigate("/Shop")}>
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="cart-summary text-end mt-4 pt-4 border-top">
                    <h5>
                        Estimated total <span className="ms-3">₹{grandTotal.toFixed(2)}</span>
                    </h5>
                    <p className="text-muted">
                        Tax included. <u>Shipping</u> and discounts calculated at checkout.
                    </p>
                    <>
                        {totalam === 0 ? (
                            <p className="text-muted">Your cart is empty.</p>
                        ) : (
                            <div className="summary-details mt-3">
                                <p className="mb-1">
                                    Total: <span className="fw-semibold">₹{totalam.toFixed(2)}</span>
                                </p>
                                <p className="mb-1">
                                    Shipping:{" "}
                                    <span className="fw-semibold">
                                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                                    </span>
                                </p>
                                <p className="mb-1">
                                    Grand Total:{" "}
                                    <span className="fw-bold">₹{grandTotal.toFixed(2)}</span>
                                </p>

                                {/* Promotional Message */}
                                {totalam < 5000 && totalam > 0 && (
                                    <p className="text-primary small mt-1">
                                        Add <strong>₹{(5000 - totalam).toFixed(2)}</strong> more to get <strong>FREE shipping!</strong>
                                    </p>
                                )}
                            </div>
                        )}
                    </>

                    {totalam > 0 && (
                        <button
                            className="btn btn-success mt-3 mb-3"
                            style={{ width: "100%", maxWidth: "250px" }}
                            onClick={handleContinue}
                        >
                            Continue
                        </button>
                    )}

                </div>
            </div>

            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0">
                <Newsletter />
            </div>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0 bottom-0 w-100">
                <Footer />
            </div>
        </>
    );
}
