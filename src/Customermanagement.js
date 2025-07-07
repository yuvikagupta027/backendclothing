import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import Sidebaradmin from "./Sidebaradmin";
import CustomerDetailsView from "./CustomerDetailsView";
import axios from "axios";

export default function Customermanagement() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);

    const [users, setusers] = useState([]);

    function fetchusers() {
        axios.post("https://backendclothing-3.onrender.com/fetchusers").then((succ) => {
            setusers(succ.data);
        })
    }

    useEffect(() => {
        fetchusers();
    }, [])

    const openDetails = (customer) => {
        setSelectedCustomer(customer);
        setShowDetails(true);
    };
    const clsoeDetails = () => {
        setSelectedCustomer("");
        setShowDetails(false);
    };

    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    return (
        <div className="d-flex flex-lg-row">
            <div className="vh-100 position-fixed shadow" style={{ width: "250px", height: "100vh", zIndex: 1000 }}>
                <Sidebaradmin />
            </div>
            <div className="col-lg-10 col-10 offset-2 p-5">
                {!showDetails ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Customer Management</h4>
                        </div>

                        <div className="card mb-4 shadow">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <span className="text-dark bg-light p-2">
                                                <FaSearch />
                                            </span>
                                            <input type="text" className="form-control" placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Customer</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Total Orders</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users
                                                .filter((row) =>
                                                    (statusFilter === "all" || row.status === statusFilter) &&
                                                    row.Username?.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map((row, i) => (
                                                    <tr key={i} style={{ cursor: "pointer" }} >
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="customer-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                                                                    {row.Username ? row.Username[0].toUpperCase() : "NA"}
                                                                </div>
                                                                <div>{row.Username}</div>
                                                            </div>
                                                        </td>
                                                        <td>{row.Email}</td>
                                                        <td>{row.Contact}</td>
                                                        <td>{row.orders || 0}</td>
                                                        <td className="d-flex gap-2 p-3">
                                                            <button className="btn btn-sm btn-outline-primary" onClick={() => openDetails(row)}><FaEye /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={clsoeDetails} className="btn btn-outline-secondary mb-3">
                            Back to Customers
                        </button>
                        <CustomerDetailsView customer={selectedCustomer} onBack={() => setShowDetails(false)} />
                    </>
                )}
            </div>
        </div>
    );
}