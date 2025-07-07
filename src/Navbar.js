import React from 'react';
import { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaShoppingBag, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete, MdLogout } from "react-icons/md";
import axios from 'axios';

export default function Navbar() {

    var id = localStorage.getItem("userlogin");
    var navi = useNavigate();

    function logoutt() {
        if (id) {
            localStorage.removeItem("userlogin");
            alert("User Logged Out");
            navi("/");
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
                <div className="container-fluid d-flex justify-content-between align-items-center px-3">
                    <div className="navbar-left">
                        <Link to="/" className="navbar-brand d-flex align-items-center">
                            <img src="/images/logo.png" className="img-fluid rounded-circle logo-img me-1" />
                            <h2 className='mt-2' style={{ fontFamily: "cursive" }}>Jerry Sports</h2>
                        </Link>
                    </div>
                    <div className="navbar-center d-none d-lg-flex">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/Shop" className="nav-link">Shop</Link>
                        <Link to="/Bestsellingpage" className="nav-link">Bestselling</Link>
                        <Link to="/Newlaunches" className="nav-link">New Launches</Link>
                        <Link to="/support" className="nav-link">Support</Link>
                    </div>
                    <div className="navbar-right d-flex align-items-center gap-3">
                        <div className="dropdown me-3 p-0 m-0">
                            <button className="btn bg-light me-1 text-dark" data-bs-toggle="dropdown">
                                <FaUser />
                            </button>
                            {id && (
                                <Link to="/Cart">
                                    <button className="btn bg-light me-1 text-dark"
                                    // data-bs-toggle="offcanvas" data-bs-target="#myoff"
                                    >
                                        <FaShoppingCart />
                                    </button>
                                </Link>
                            )}
                            {id && (
                                <button className="btn bg-light me-1 text-dark" onClick={logoutt}>
                                    <MdLogout />
                                </button>
                            )}
                            <ul className="dropdown-menu">
                                {!id && (
                                    <li className="dropdown-item bg-light">
                                        <Link to="/Login" className="text-decoration-none text-dark">
                                            Login
                                        </Link>
                                    </li>
                                )}
                                {id && (
                                    <li className="dropdown-item bg-light">
                                        <Link to="/Profile" className="text-decoration-none text-dark">
                                            My Profile
                                        </Link>
                                    </li>
                                )}
                                {id && (
                                    <li className="dropdown-item bg-light">
                                        <Link to="/Orders" className="text-decoration-none text-dark">
                                            Your Past Orders
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
