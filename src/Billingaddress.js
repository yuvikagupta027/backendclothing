import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Billingaddress() {

    const [cartt, setcartt] = useState([]);
    const [products, setproducts] = useState([]);
    var id = localStorage.getItem("userlogin");
    var navi = useNavigate();

    function fetchcart() {
        axios.post("https://backendclothing-3.onrender.com/fetchcart", { id }).then((succ) => {
            setcartt(succ.data);
            // console.log("Cart updated:", succ.data);
        }).catch((err) => console.error("Error fetching cart:", err));
    }
    function fetchform() {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((succ) => {
            setproducts(succ.data);
        })
    }

    useEffect(() => {
        fetchcart();
        fetchform();
    }, [])


    const [totalam, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = totalam + shipping;

    function calculate() {
        let newTotal = 0;
        for (let i = 0; i < cartt.length; i++) {
            const item = cartt[i];
            newTotal += item.CartValue * item.Price;
        }
        settotalam(newTotal);
        console.log(newTotal);
    }
    useEffect(() => {
        calculate();
    }, [cartt]);

    function submitaddress(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email = data.get("email");
        var firstname = data.get("firstName");
        var lastname = data.get("lastName");
        var line1 = data.get("line1");
        var line2 = data.get("line2");
        var country = data.get("country");
        var postalcode = data.get("postalcode");
        var city = data.get("city");
        var state = data.get("state");
        var contact = data.get("contact");
        var userId = localStorage.getItem('userlogin');

        axios.post("https://backendclothing-3.onrender.com/submitaddress", {
            Email: email,
            Firstname: firstname,
            Lastname: lastname,
            Line1: line1,
            Line2: line2,
            Country: country,
            Postalcode: postalcode,
            City: city,
            State: state,
            Contact: contact,
            UserId: userId
        }).then((succ) => {
            console.log(succ.data);
            alert("Address is added")
        })
    }

    const [address, setaddress] = useState([]);

    function fetchaddress() {
        axios.post("https://backendclothing-3.onrender.com/fetchaddress", { id }).then((succ) => {
            setaddress(succ.data);
        })
    }
    useEffect(() => {
        fetchaddress();
    }, [])

    const [selectedAddress, setSelectedAddress] = useState(null);

    function orderplaced() {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        } else {

            const orderData = {
                userId: id,
                address: selectedAddress,
                cartItems: cartt,
                shipping: shipping,
                status: "Pending",
                orderDate: new Date().toISOString(),
            };
            // console.log(orderData);

            axios.post("https://backendclothing-3.onrender.com/placeorder", orderData).then((succ) => {
                console.log("Order placed:", succ.data);
                alert("Order placed successfully!");
                navi("/Orders");
            })
        }
    }

    return (
        <>
            <div className="row m-0 p-3 vh-100 justify-content-around bg-dark align-items-center">
                <div className="col-lg-6">
                    <div className="card shadow p-3">
                        <h4 className="fw-bold text-dark mb-3">Billing Address</h4>
                        <form onSubmit={submitaddress}>
                            <input type="email" placeholder="Email Address" name="email" className="form-control mb-2" required />
                            <div className="d-flex gap-2">
                                <input type="text" placeholder="First Name" name="firstName" className="form-control mb-2" required />
                                <input type="text" placeholder="Last Name" name="lastName" className="form-control mb-2" required />
                            </div>
                            <div className="d-flex gap-2">
                                <input type="text" placeholder="Address Line 1" name="line1" className="form-control mb-2" required />
                                <input type="text" placeholder="Address Line 2" name="line2" className="form-control mb-2" required />
                            </div>
                            <div className="d-flex gap-2">
                                <input type="text" placeholder="Country" name="country" className="form-control mb-2" required />
                                <input type="tel" placeholder="Postal Code" name="postalcode" className="form-control mb-2" required />
                            </div>
                            <div className="d-flex gap-2">
                                <input type="text" placeholder="City" name="city" className="form-control mb-2" required />
                                <input type="text" placeholder="State" name="state" className="form-control mb-2" required />
                            </div>
                            <input type="tel" placeholder="Mobile Phone" name="contact" className="form-control mb-2" required />
                            <button className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow p-4">
                        <h5 className="fw-bold text-dark mb-2">Saved Addresses</h5>
                        <select
                            className="form-control mb-3"
                            onChange={(e) => {
                                const index = e.target.value;
                                setSelectedAddress(address[index]);
                            }}
                        >
                            <option value="" disabled selected>Select Address</option>
                            {address.map((row, index) => (
                                <option key={index} value={index}>
                                    {row.Email}, {row.Line1}, {row.Line2}, {row.City}
                                </option>
                            ))}
                        </select>

                        <div className="mt-1 border border-2 p-2">
                            <table className="table table-light">
                                <tbody>
                                    <tr>
                                        <td>Total</td>
                                        <td align="right">₹{totalam.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td align="right">₹{shipping.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Grand Total</td>
                                        <td align="right">₹{grandTotal.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="">
                                {/* <Link to={"/Thankyou"}> */}
                                <button className="btn btn-success w-100" onClick={orderplaced}>
                                    Place Order
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}