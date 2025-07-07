import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Track() {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [showTracking, setShowTracking] = useState(false);

    const handleTrack = async () => {
        if (email) {
            try {
                const res = await axios.post("https://backendclothing-3.onrender.com/trackorder", { email });
                if (res.data.length > 0) {
                    setOrders(res.data);
                    setShowTracking(true);
                } else {
                    alert("No orders found for this email.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error fetching orders.");
            }
        } else {
            alert("Please enter your email address.");
        }
    };

    const renderStatusTracker = (status) => {
        const steps = ["Order Placed", "Preparing", "Shipped", "Delivered"];
        const statusIndex = status === "Pending" ? 1 : status === "Delivered" ? 3 : 2;

        return (
            <div className="progress-tracker d-flex gap-3 mb-3">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className={`step px-3 py-1 rounded ${index <= statusIndex ? "bg-success text-white" : "bg-light text-muted"}`}
                    >
                        {step}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <h2 className="fw-bold">Track Your Orders</h2>
                <p>Enter your email address below to see all your orders.</p>

                <div className="mb-3 col-md-6">
                    <label className="form-label">Email Address:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="user@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary mb-4" onClick={handleTrack}>
                    View My Orders
                </button>

                {showTracking && orders.map((order, index) => (
                    <div key={order._id} className="tracking-box p-4 mb-5 border rounded shadow-sm">
                        <h5 className="fw-bold">Order #{order._id.slice(-6).toUpperCase()}</h5>
                        <p className="text-muted">Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>

                        {order.cartItems.map((item, i) => (
                            <div key={i} className="d-flex align-items-center gap-3 mb-3">
                                <img src={item.Images} alt={item.Productname} width="70" />
                                <div>
                                    <h6 className="text-primary">{item.Productname}</h6>
                                    <p className="small mb-0">
                                        Color: {item.selectedColor} | Size: {item.selectedSize} | Qty: {item.CartValue}
                                    </p>
                                    <span className={`badge ${item.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="shipment-status mt-3">
                            <h6 className="fw-semibold">Shipping Status</h6>
                            <p className={order.status === "Delivered" ? "text-success" : "text-info"}>
                                {order.status === "Delivered" ? "✅ Delivered" : "🚚 In Transit"}
                            </p>
                            {renderStatusTracker(order.status)}
                        </div>

                        <div className="d-flex justify-content-between border-top pt-3 mt-3">
                            <p><strong>Shipping:</strong> ₹{order.shipping || 0}</p>
                            <p><strong>Total:</strong> ₹{order.cartItems.reduce((acc, item) => acc + item.Price * item.CartValue, 0) + (order.shipping || 0)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
