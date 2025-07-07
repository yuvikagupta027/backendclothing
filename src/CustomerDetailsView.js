import axios from "axios";
import { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function CustomerDetailsView({ customer }) {
    const [actions] = useState([
        { name: "Send Email", icon: <MdEmail className="me-2" /> },
        { name: "Send Message", icon: <BiMessage className="me-2" /> },
        { name: "Delete Customer", icon: <FaTrash className="me-2 text-danger" /> },
    ]);

    const [status, setStatus] = useState(customer?.Status || "Active");

    if (!customer) return null;

    function updateStatus(newStatus) {

        axios.post("https://backendclothing-3.onrender.com/updateuserstatus", {
            id: customer._id,
            Status: newStatus
        }).then(() => {
            alert("Status updated successfully");
            setStatus(newStatus);
        }).catch((err) => {
            console.error("Failed to update status", err);
            alert("Error updating status");
        });
    }

    return (
        <div className="col p-0" id="customerDetailsView">
            <div className="main-content">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <div>
                            <h5 className="mb-1">{customer.name}</h5>
                            <p className="mb-0">{customer.email}</p>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-tabs" id="customerTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab">
                            Personal Info
                        </button>
                    </li>
                </ul>
                <div className="tab-content mt-3" id="customerTabsContent">
                    <div className="tab-pane active" id="personal" role="tabpanel">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h6 className="card-title">Contact Details</h6>
                                        <p><strong>Customer Name:</strong> {customer.Username}</p>
                                        <p><strong>Phone:</strong> {customer.Contact}</p>
                                        <p className="d-flex align-items-center">
                                            <strong>Status:</strong> &nbsp;
                                            <select
                                                className="form-select form-select-sm fw-bold"
                                                value={status}
                                                onChange={(e) => updateStatus(e.target.value)}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Blocked">Blocked</option>
                                            </select>
                                        </p>
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
