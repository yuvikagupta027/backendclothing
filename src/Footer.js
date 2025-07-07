import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer-section text-white pt-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <h5 className="mb-3">Jerry Sports</h5>
                        <p className="text-light">Timeless menswear designed for the modern man. <br />Craftsmanship. Comfort. Confidence.</p>
                    </div>

                    <div className="col-6 col-lg-3 col-md-3 col-sm-6">
                        <h6 className="text-uppercase mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="footer-link text-light text-decoration-none">Shop All</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">New Arrivals</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Best Sellers</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Fit Guide</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Gift Cards</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-3 col-sm-6">
                        <h6 className="text-uppercase mb-3">Customer Care</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="footer-link text-light text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Shipping & Returns</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">FAQs</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Order Tracking</a></li>
                            <li><a href="#" className="footer-link text-light text-decoration-none">Size Guide</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <h6 className="text-uppercase mb-3">Follow Us</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className="social-icon text-white"><FaInstagram /></a>
                            <a href="#" className="social-icon text-white"><FaFacebook /></a>
                            <a href="#" className="social-icon text-white"><FaPinterest /></a>
                            <a href="#" className="social-icon text-white"><FaTwitter /></a>
                            <a href="#" className="social-icon text-white"><FaYoutube /></a>
                        </div>
                    </div>
                </div>



                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 border-top w-100 pt-3">
                    <p className="text-light text-decoration-none small mb-3">© 2023 SOCIALBUZDYNAMICS. All rights reserved.</p>
                    <div className="d-flex gap-4">
                        <a href="#" className="footer-link text-light text-decoration-none small mb-3">Privacy Policy</a>
                        <a href="#" className="footer-link text-light text-decoration-none small mb-3">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};