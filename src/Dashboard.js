import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import SalesOverviewCard from './SalesOverviewCard';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaSearch, FaUser } from "react-icons/fa";
import { IoMdLogOut, IoMdMail, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { MdChecklist, MdOutlineShoppingCart } from "react-icons/md";
import Sidebaradmin from "./Sidebaradmin";
import axios from 'axios';
import { BsArrowReturnLeft, BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';


export default function Dashboard() {

    const userId = useState(localStorage.getItem("userlogin"));

    const sidebarRef = useRef(null);
    const contentRef = useRef(null);
    const chartRef = useRef(null);

    const [products, setproducts] = useState([]);

    function fetchform() {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((succ) => {
            setproducts(succ.data);
        })
    }

    useEffect(() => {
        fetchform();
    }, [])

    const [users, setusers] = useState([]);

    function fetchusers() {
        axios.post("https://backendclothing-3.onrender.com/fetchusers").then((succ) => {
            setusers(succ.data);
        })
    }

    useEffect(() => {
        fetchusers();
    }, [])

    const [cartt, setcartt] = useState([]);

    useEffect(() => {
        axios.post("https://backendclothing-3.onrender.com/fetchadminorders")
            .then((res) => {
                setcartt(res.data);
                setOrderDetails(res.data);
            });
    }, []);

    const pendingCount = cartt.filter(order => order.status === "Pending").length;
    const deliveredCount = cartt.filter(order => order.status === "Delivered").length;
    const cancelledCount = cartt.filter(order => order.status === "Cancelled").length;


    const [notificationcenter, setnotificationcenter] = useState([
        { icon: <MdOutlineShoppingCart className='fw-bold' />, date: "December 12, 2023", notification: "New order #1234 has been placed" },
        { icon: <FaUser className='fw-bold' />, date: "December 12, 2023", notification: "5 new customers signed up today!" },
        { icon: <FaExclamationTriangle className='fw-bold' />, date: "December 10, 2023", notification: ["Inventory alert: Product Wireless", "Earbuds is low on stock."] }
    ]);

    const messages = [
        { id: 1, bg: 'bg-success', text: "Hi there! I am wondering if you can help me with a problem I've been having.", sender: "Emily Fowler", time: "58m" },
        { id: 2, bg: 'bg-warning', text: "I have the photos that you ordered last month, how would you like them sent to you?", sender: "Jae Chun", time: "1d" },
    ];
    const userMenu = [
        { label: "Profile", icon: <FaUser className="me-2" /> },
        { label: "Settings", icon: <IoMdSettings className="me-2" /> },
        { label: "Activity Log", icon: <MdChecklist className="me-2" /> },
    ];
    const totalSales = products.reduce((total, product) => {
        let revenue = 0;

        cartt.forEach(order => {
            if (Array.isArray(order.cartItems)) {
                order.cartItems.forEach(item => {
                    if (item.Productname === product.Productname) {
                        const qty = parseInt(item.CartValue) || 0;
                        const price = parseFloat(item.Price) || 0;
                        revenue += qty * price;
                    }
                });
            }
        });

        return total + revenue;
    }, 0);

    const [totalam, settotalam] = useState(0);
    const shipping = 20;
    const grandTotal = (totalam + shipping);

    function calculate() {
        let total = 0;

        cartt.forEach(order => {
            if (order.status === "Delivered" && Array.isArray(order.cartItems)) {
                let orderTotal = order.cartItems.reduce((sum, item) => {
                    const qty = parseFloat(item.CartValue) || 0;
                    const price = parseFloat(item.Price) || 0;
                    return sum + qty * price;
                }, 0);

                orderTotal += 20; // Add shipping per delivered order
                total += orderTotal;
            }
        });

        settotalam(total);
        console.log("Delivered Orders Total:", total);
    }


    useEffect(() => {
        calculate();
    }, [cartt]);

    const statsData = [
        // { title: "Total Sales", value: "₹40,000", change: "12% since last month", changeIcon: "bi bi-arrow-up", changeClass: "text-success", icon: "bi bi-currency-dollar", color: "primary" },
        // { title: "Total Sales", value: `₹${totalSales.toLocaleString()}`, change: "12% since last month", changeIcon: "bi bi-arrow-up", changeClass: "text-success", icon: "bi bi-currency-dollar", color: "primary" },
        {
            title: "Total Sales in ₹",
            value: totalam.toFixed(2),
            change: "12% since last month",
            changeIcon: "bi bi-arrow-up",
            changeClass: "text-success",
            icon: "bi bi-currency-dollar",
            color: "primary"
        },
        {
            title: "Orders", value: cartt.length, icon: "bi bi-cart-check", color: "info",
            change: (
                <>
                    <span className="text-warning me-2">
                        <FaClock /> {pendingCount} Pending
                    </span>
                    <span className="text-success me-2">
                        <FaCheckCircle /> {deliveredCount} Delivered
                    </span>
                    <span className="text-danger">
                        <BsArrowReturnLeft /> {cancelledCount} Cancelled
                    </span>
                </>
            ),
        },
        { title: "Total Products", value: products.length, change: "5 new this week", changeIcon: "bi bi-plus-circle", changeClass: "text-info", icon: "bi bi-box-seam", color: "success" },
        { title: "New Customer Signups", value: users.length, change: "18% since last month", changeIcon: "bi bi-arrow-up", changeClass: "text-success", icon: "bi bi-people", color: "warning" },
    ];

    const quickActions = [
        { link: "Products", title: "Add Product", description: "Add new products to your inventory", icon: "bi bi-plus-circle", color: "bg-primary" },
        { link: "Adminorders", title: "View Orders", description: "Manage and process customer orders", icon: "bi bi-list-check", color: "bg-success" },
        // { link: "", title: "Manage Inventory", description: "Update stock levels and product details", icon: "bi bi-box", color: "bg-info" },
        // { link: "", title: "View Messages", description: "Respond to customer inquiries", icon: "bi bi-chat-dots", color: "bg-warning" },
    ];

    const [orderDetails, setOrderDetails] = useState([]);

    const activityData = [
        { id: 1, icon: "bi-cart", bgColor: "primary", timestamp: "December 12, 2023 - 10:45 AM", message: <>New order <span className="fw-bold">#1234</span> placed by <span className="fw-bold">John Smith</span></>, extra: <div className="small text-primary">₹245.99</div> },
        { id: 2, icon: "bi-person-plus", bgColor: "success", timestamp: "December 12, 2023 - 9:30 AM", message: <>New customer <span className="fw-bold">Sarah Johnson</span> registered</> },
        { id: 3, icon: "bi-box-seam", bgColor: "warning", timestamp: "December 11, 2023 - 4:15 PM", message: <>Inventory updated for <span className="fw-bold">Wireless Earbuds Pro</span></>, extra: <div className="small text-warning">Stock level: 42 units</div> },
        { id: 4, icon: "bi-truck", bgColor: "info", timestamp: "December 11, 2023 - 2:30 PM", message: <>Order <span className="fw-bold">#1228</span> shipped to <span className="fw-bold">Michael Brown</span></> },
        { id: 5, icon: "bi-arrow-return-left", bgColor: "danger", timestamp: "December 11, 2023 - 11:20 AM", message: <>Return request for order <span className="fw-bold">#1220</span> received</>, extra: <div className="small text-danger">Reason: Product damaged during shipping</div> },
    ];



    return (
        <>
            <div className="d-flex flex-lg-row">
                <div className="vh-100 position-fixed shadow" style={{ width: "250px", height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>

                <div className="col-lg-10 col-10 offset-2">
                    {/* <!-- Content Wrapper --> */}
                    <div class="content">
                        {/* <!-- Topbar --> */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4">
                            <form>
                                <div className="input-group ms-2">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" />
                                    <button className="btn btn-secondary text-light" type="button">
                                        <FaSearch className='mb-1' />
                                    </button>
                                </div>
                            </form>

                            <ul className="navbar-nav ms-auto">

                                
                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* User Information */}
                                <li className="nav-item dropdown no-arrow user-dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <button className="btn btn-primary d-flex mt-2 align-items-center">
                                            <div className="icon-circle text-light"><FaUser /></div>
                                            <span className="ms-2 d-none d-lg-inline text-gray-600 small">Admin User</span>
                                        </button>
                                    </a>
                                    {/* <div className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                                        {userMenu.map((item, i) => (
                                            <a key={i} className="dropdown-item" href="#">
                                                {item.icon} {item.label}
                                            </a>
                                        ))}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">
                                            <IoMdLogOut className="me-2" />Logout
                                        </a>
                                    </div> */}
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- Begin Page Content --> */}
                        <div class="container-fluid">
                            {/* <!-- Page Heading --> */}
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                                {/* <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i class="bi bi-download text-white-50 me-1"></i> Generate Report
                                </a> */}
                            </div>

                            {/* <!-- Overview/Analytics Cards --> */}
                            <div className="row">
                                {statsData.map((stat, index) => (
                                    <div key={index} className="col-xl-3 col-md-6 mb-4">
                                        <div className={`card stat-card ${stat.color} h-100 py-2`}>
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className={`text-xs font-weight-bold text-${stat.color} text-uppercase mb-1`}>
                                                            {stat.title}
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{stat.value}</div>
                                                        <div className={`mt-2 small ${stat.changeClass || ''}`}>
                                                            {typeof stat.change === "string" ? (
                                                                <>
                                                                    <i className={stat.changeIcon}></i> {stat.change}
                                                                </>
                                                            ) : (
                                                                stat.change
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className={`${stat.icon} stat-icon text-${stat.color}`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <!-- Quick Actions Section --> */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
                                        </div>
                                        {/* <div className="card-body">
                                            <div className="d-flex">
                                                {quickActions.map((action, index) => (
                                                    <Link to={action.link} className='text-decoration-none'>
                                                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                                                            <div className={`card quick-action-card ${action.color} text-white text-center p-4`}>
                                                                <div className="quick-action-icon mb-2">
                                                                    <i className={action.icon}></i>
                                                                </div>
                                                                <h5>{action.title}</h5>
                                                                <p className="small mb-0">{action.description}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div> */}
                                        <div className="card-body">
                                            <div className="row">
                                                {quickActions.map((action, index) => (
                                                    <div key={index} className="col-lg-3 col-md-6 mb-4">
                                                        <Link to={action.link} className="text-decoration-none">
                                                            <div className={`card quick-action-card ${action.color} text-white text-center p-4`}>
                                                                <div className="quick-action-icon mb-2">
                                                                    <i className={action.icon}></i>
                                                                </div>
                                                                <h5>{action.title}</h5>
                                                                <p className="small mb-0">{action.description}</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <!-- Content Row --> */}
                            <div class="row justify-content-center">
                                {/* <!-- Bestselling Products --> */}
                                <div class="col-lg-11">
                                    <div class="card mb-4">
                                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="m-0 font-weight-bold text-primary">Bestselling Products</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Product Name</th>
                                                            <th>Category</th>
                                                            <th>Material Type</th>
                                                            <th>Price</th>
                                                            <th>Stock Availability</th>
                                                            {/* <th>Units Sold</th>
                                                            <th>Revenue</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((product) => {
                                                            let unitsSold = 0;
                                                            let revenue = 0;

                                                            orderDetails.forEach(order => {
                                                                if (Array.isArray(order.cartItems)) {
                                                                    order.cartItems.forEach(item => {
                                                                        if (item.Productname === product.Productname) {
                                                                            const qty = parseInt(item.CartValue) || 0;
                                                                            const price = parseFloat(item.Price) || 0;
                                                                            unitsSold += qty;
                                                                            revenue += qty * price;

                                                                        }
                                                                    });
                                                                }
                                                            });

                                                            const soldPercentage = unitsSold + parseInt(product.Stock) > 0
                                                                ? (unitsSold / (unitsSold + Number(product.Stock))) * 100
                                                                : 0;

                                                            console.log(product);

                                                            return (
                                                                <tr key={product._id}>
                                                                    <td>{product.Productname}</td>
                                                                    <td>{product.Category}</td>
                                                                    <td>{product.Type}</td>
                                                                    <td>₹{product.Price}</td>
                                                                    <td>
                                                                        <span className={`badge ${product.Stock === 'In Stock' ? 'bg-success' : 'bg-danger'}`}>
                                                                            {product.Stock}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Recent Activity --> */}
                                {/* <div className="col-xl-4 col-lg-5">
                                    <div className="card mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Recent Activity</h6>
                                            <div className="dropdown no-arrow">
                                                <a href="#" role="button" id="dropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <BsThreeDotsVertical className='text-secondary' />
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-end shadow animated--fade-in" aria-labelledby="dropdownMenuLink2">
                                                    <div className="dropdown-header">Options:</div>
                                                    <a className="dropdown-item" href="#">View All Activity</a>
                                                    <a className="dropdown-item" href="#">Export Data</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="timeline">
                                                {activityData.map((item, index) => (
                                                    <div key={item.id} className={`timeline-item mb-3 pb-3 ${index < activityData.length - 1 ? "border-bottom" : ""}`}>
                                                        <div className="d-flex">
                                                            <div className="flex-shrink-0">
                                                                <div className={`icon-circle bg-${item.bgColor}`}>
                                                                    <i className={`bi ${item.icon} text-white`}></i>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <div className="small text-gray-500">{item.timestamp}</div>
                                                                <div>{item.message}</div>
                                                                {item.extra && item.extra}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-center mt-3">
                                                <a href="#" className="btn btn-sm btn-primary">View All Activity</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            // </div> */}
                            </div>
                            {/* <div className="container mt-4">
                                <SalesOverviewCard />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 