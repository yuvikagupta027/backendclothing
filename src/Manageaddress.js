import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebarprofile from "./Sidebarprofile";

export default function Manageaddress() {

    var id = localStorage.getItem("userlogin");
    const [products, setproducts] = useState([]);

    function fetchform() {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((succ) => {
            setproducts(succ.data);
        })
    }

    useEffect(() => {
        fetchform();
    }, [])

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

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [address, setaddress] = useState([]);

    function fetchaddress() {
        axios.post("https://backendclothing-3.onrender.com/fetchaddress", { id }).then((succ) => {
            setaddress(succ.data);
        })
    }
    useEffect(() => {
        fetchaddress();
    }, [])


    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-start">
                <div className="col-lg-2">
                    <Sidebarprofile />
                </div>
                <div className="row col-lg-10 offset-2 m-0 p-3 mt-5 justify-content-around align-items-center">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}