import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegCreditCard, FaUser, FaUsers } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoShirtSharp } from "react-icons/io5";
import { MdCategory, MdShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { TbAddressBook } from "react-icons/tb";


export default function Sidebarprofile() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const id = localStorage.getItem("adminlogin");

    const sidebarLinks = [
        { link: "/Profile", icon: <FaUser size={20} />, name: "Profile Information" },
        // { link: "/Manageaddress", icon: <TbAddressBook size={20} />, name: "Manage Addresses" },
        // { link: "/Paninformation", icon: <FaRegCreditCard size={20} />, name: "PAN Card Information" },
    ];
    return (
        <>
            <button className="btn text-light d-md-none m-2" onClick={() => setIsOpen(!isOpen)}>
                <IoMdMenu size={25} />
            </button>
            <div
                className={`bg-primary text-light vh-100 p-2 sidebar ${isOpen ? "d-block" : "d-none"
                    } d-md-block`}
                style={{ width: "250px" }}
            >
                <div className="bg-light text-primary text-center p-3 rounded">
                    <h4 className="fw-bold">MY PROFILE</h4>
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
                    </ul>
                </nav>
            </div>
        </>
    )
}