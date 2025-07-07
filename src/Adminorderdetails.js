import { FaUser } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Adminorderdetails() {

    const [cartt, setcartt] = useState([]);
    const [cartItems, setcartItems] = useState([]);
    const userId = localStorage.getItem('userlogin');

    const [idd, setidd] = useState(new URLSearchParams(useLocation().search).get("id"));

    // function fetchcart() {
    //     if (idd && userId) {
    //         axios.post("https://backendclothing-3.onrender.com/fetchorder", { id: userId, idd: idd }).then((res) => {
    //             setcartt([res.data]);
    //         }).catch((err) => console.error("Error fetching cart:", err));
    //     }
    // }

    function fetchadminorder() {
        axios.post("https://backendclothing-3.onrender.com/fetchadminorder", { idd: idd }).then((res) => {
            setcartt(Array.isArray(res.data) ? res.data : [res.data]);
        }).catch((err) => console.error("Error fetching cart:", err));
    }

    useEffect(() => {
        fetchadminorder();
    }, []);

    function markAsDelivered(orderId) {
        if (window.confirm("Mark this order as Delivered?")) {
            axios.post("https://backendclothing-3.onrender.com/deliverorder", { id: orderId })
                .then((succ) => {
                    if (succ.data === "ok") {
                        alert("Order marked as Delivered!");
                        fetchadminorder();
                    } else {
                        alert("Failed to update order status.");
                    }
                })
        }
    }


    const [totalam, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = totalam + shipping;

    function calculate() {
        let newTotal = 0;
        cartt.forEach(order => {
            if (Array.isArray(order.cartItems)) {
                order.cartItems.forEach((item) => {
                    const qty = parseFloat(item.CartValue) || 0;
                    const price = parseFloat(item.Price) || 0;
                    newTotal += qty * price;
                });
            }
        });
        settotalam(newTotal);
        console.log("Total Amount:", newTotal);
    }

    useEffect(() => {
        calculate();
    }, [cartt]);
    return (
        <>
            <div className="row m-0 vh-100 overflow-hidden">
                <div className="col-lg-2 bg-dark shadow vh-100 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2">
                    {cartt.length > 0 ? (
                        cartt.map((order, index) => (
                            <div key={order._id}>
                                <nav className="d-flex justify-content-end p-4">
                                    <button className="btn btn-success text-light d-flex">
                                        <FaUser />
                                    </button>
                                </nav>
                                <div className="col-lg-10 col-11 card m-auto mb-2 p-2">
                                    <div className="col-lg-1 d-flex justify-content-between w-100 mb-2">
                                        <span className={`badge ${order.status === "Pending" ? "bg-warning" :
                                            order.status === "Delivered" ? "bg-success" : "bg-danger"}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p>Ordered By: {order.address?.Email}</p>
                                    <p>Ordered On: {new Date(order.orderDate).toLocaleString()}</p>
                                </div>
                                <div className="col-lg-10 col-11 card p-0 m-auto">
                                    <div>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {order.cartItems.map((item, i) => ( */}
                                                {Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
                                                    order.cartItems.map((item, i) => (
                                                        <tr key={item._id || i}>
                                                            <td className="w-25">
                                                                <img src={item.Images} style={{ width: "80px", height: "80px" }} alt="Product" />
                                                            </td>
                                                            <td>{item.Productname}</td>
                                                            <td>{item.Description}</td>
                                                            <td>{item.CartValue}</td>
                                                            <td>₹{item.Price}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center text-muted">
                                                            No items in this order.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <tfoot >
                                                <td colSpan="7">
                                                    <div>
                                                        <div className="d-flex justify-content-between px-3">
                                                            <h6 className="fw-bold">Total Price</h6>
                                                            <h6>₹{totalam.toFixed(2)}</h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between px-3">
                                                            <h6 className="fw-bold">Shipping Charges</h6>
                                                            <h6>₹{shipping.toFixed(2)}</h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between px-3">
                                                            <h6 className="fw-bold">Grand Total</h6>
                                                            <h6>₹{grandTotal.toFixed(2)}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-secondary">No orders found.</div>
                    )}
                </div>
            </div>
        </>
    )
}