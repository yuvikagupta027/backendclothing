import { useEffect, useState } from "react";
// import Navbar2 from "./Navbar2";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import Navbar from "./Navbar";

export default function OrderDetail() {

    const [cartt, setcartt] = useState([]);
    const userId = localStorage.getItem('userlogin');

    const [idd, setidd] = useState(new URLSearchParams(useLocation().search).get("id"));

    function fetchcart() {
        if (idd && userId) {
            axios.post("https://backendclothing-3.onrender.com/fetchorder", { id: userId, idd: idd }).then((res) => {
                setcartt([res.data]);
            }).catch((err) => console.error("Error fetching cart:", err));
        }
    }
    useEffect(() => {
        fetchcart();
    }, [userId, idd]);

    function cancelOrder(orderId) {
        console.log("Cancelling order with ID:", orderId);
        if (window.confirm("Are you sure you want to cancel this order?")) {
            axios.post("https://backendclothing-3.onrender.com/cancelorder", { id: orderId })
                .then((succ) => {
                    if (succ.data === "ok") {
                        alert("Order cancelled successfully!");
                        fetchcart();
                    } else {
                        alert("Failed to cancel order.");
                    }
                })
                .catch((err) => {
                    console.error("Error canceling order:", err);
                    alert("An error occurred while canceling the order.");
                });
        }
    }

    return (
        <>
            <Navbar />
            <div className="bg-dark">
                <div className="container py-5 min-vh-100">
                    {cartt.length > 0 ? (
                        cartt.map((order, index) => (
                            <div key={index} className="mb-5">
                                <div className="row m-0 align-items-center">
                                    <div className="col-lg-1">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1356/1356594.png" className="img-fluid" />
                                    </div>
                                    <div className="col-lg-4 text-light">
                                        {order.cartItems.length > 0 ? (
                                            <>
                                                {order.cartItems[0].Productname}+
                                                {order.cartItems.length - 1}
                                            </>
                                        ) : (
                                            <>
                                                <h3>No Products Added</h3>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="text-light">
                                            <div className="text-end">
                                                <div className="text-secondary small">Paid using credit card ending with 7343</div>
                                                <div className="fw-bold fs-6">
                                                    Grand Total: ₹
                                                    {(
                                                        order.cartItems.reduce(
                                                            (acc, item) => acc + item.CartValue * parseFloat(item.Price),
                                                            0
                                                        ) + (order.shipping || 0)
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <span className={`badge ${order.status === "Pending" ? "bg-warning" :
                                            order.status === "Delivered" ? "bg-success" :
                                                "bg-danger"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="col-lg-2">
                                        {/* <button className="w-100 mb-2 btn btn-outline-light">VIEW ORDER</button> */}
                                        {order.status === "Pending" && (
                                            <button onClick={() => cancelOrder(order._id)} className="w-100 btn btn-warning">
                                                CANCEL ORDER
                                            </button>
                                        )}
                                        {order.status === "Delivered" && (
                                            <button className="w-100 btn btn-success text-light fw-bold">
                                                Delivered
                                            </button>
                                        )}
                                        {order.status === "Cancelled" && (
                                            <button className="w-100 btn btn-danger" disabled>
                                                Cancelled
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom border-light">
                                    <div>
                                        <span className="badge bg-secondary me-2">Order #{index + 1}</span>
                                        <p className="text-secondary m-0 small">
                                            Order Placed: {new Date(order.orderDate).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {order.cartItems.map((item, i) => (
                                    <div key={i} className="row mb-4 align-items-center border border-1 p-2 rounded">
                                        <div className="col-md-2 col-4">
                                            <img src={item.Images} alt={item.Productname} className="img-fluid rounded w-50" />
                                        </div>
                                        <div className="col-md-7 col-8">
                                            <h6 className="mb-1">{item.Title}</h6>
                                            <small className="text-secondary">{item.Description}</small>
                                            <div className="mt-2">
                                                <span className="me-3">Qty: <strong>{item.CartValue}</strong></span>
                                                <span>Price: <strong>₹{item.Price}</strong></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3 text-md-end mt-3 mt-md-0">
                                            <div>
                                                <span className="text-warning fw-bold">In - Transit</span>
                                            </div>
                                            <div className="text-secondary small">Delivery Expected by:</div>
                                            <h6 className="fw-bold text-light">10 days</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-secondary">No orders found.</div>
                    )}
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
