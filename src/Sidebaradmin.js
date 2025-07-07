import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdCategory, MdLogout, MdShoppingBag, MdContentPaste } from "react-icons/md";
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { BsBarChartFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { IoShirtSharp } from "react-icons/io5";

export default function Sidebaradmin() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const id = localStorage.getItem("adminlogin");

    const sidebarLinks = [
        { link: "/Dashboard", icon: <AiFillDashboard size={20} />, name: "Dashboard" },
        { link: "/Categories", icon: <MdCategory size={20} />, name: "Categories" },
        { link: "/Products", icon: <IoShirtSharp size={20} />, name: "Products" },
        { link: "/Customermanagement", icon: <FaUsers size={20} />, name: "Customers" },
        { link: "/Adminorders", icon: <MdShoppingBag size={20} />, name: "Orders" },

        // { link: "/promotions", icon: <BiSolidOffer size={20} />, name: "Promotions" },
        // { link: "/reports", icon: <BsBarChartFill size={20} />, name: "Reports" },
        // { link: "/content", icon: <MdContentPaste size={20} />, name: "Content" },
        // { link: "/settings", icon: <IoMdSettings size={20} />, name: "Settings" },
        // { link: "/userroles", icon: <RiAdminFill size={20} />, name: "Users & Roles" },
    ];

    const logout = () => {
        if (id) {
            localStorage.removeItem("adminlogin");
            navigate("/adminloginn");
        }
    };

    return (
        <>
            {/* Toggle button for small screens */}
            <button className="btn text-light d-md-none m-2" onClick={() => setIsOpen(!isOpen)}>
                <IoMdMenu size={25} />
            </button>

            {/* Sidebar content */}
            <div
                className={`bg-primary text-light vh-100 p-2 sidebar ${isOpen ? "d-block" : "d-none"
                    } d-md-block`}
                style={{ width: "250px" }}
            >
                <div className="bg-light text-primary text-center p-3 rounded">
                    <h4 className="fw-bold">ADMIN PANEL</h4>
                </div>
                <hr className="text-light" />
                <nav>
                    <ul className="nav flex-column">
                        {sidebarLinks.map((row, index) => (
                            <li className="nav-item" key={index}>
                                <Link to={row.link} className="nav-link text-light">
                                    <div className="d-flex align-items-center">
                                        {row.icon}
                                        <span className="ms-3">{row.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item mt-auto">
                            <button
                                className="btn btn-danger mt-4 w-100 d-flex align-items-center justify-content-center"
                                onClick={logout}
                            >
                                <MdLogout />
                                <span className="ms-2">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
