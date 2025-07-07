import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

export default function Orders() {
    const [cartt, setcartt] = useState([]);
    const userId = localStorage.getItem("userlogin");
    // console.log("User ID:", userId);
    var navi = useNavigate();

    function fetchcart() {
        axios.post("https://backendclothing-3.onrender.com/fetchorders", { id: userId })
            .then((succ) => {
                setcartt(succ.data);
            })
            .catch((err) => console.error("Error fetching cart:", err));
    }

    useEffect(() => {
        fetchcart();
    }, [userId]);

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
                                                {order.cartItems[0].Productname}
                                                {/* + */}
                                                {/* {order.cartItems.length - 1} */}
                                            </>
                                        ) : (
                                            <>
                                                <h5>No Products Added</h5>
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
                                        <button onClick={() => navi("/OrderDetail?id=" + order._id)} className="w-100 mb-2 btn btn-outline-light">VIEW ORDER</button>
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
                                            <button className="w-100 btn btn-danger fw-bold" >
                                                Cancelled
                                            </button>
                                        )}
                                        {/* <button onClick={() => cancelOrder(order._id)} className="w-100 btn btn-outline-light">× CANCEL ORDER</button> */}
                                    </div>
                                </div>
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