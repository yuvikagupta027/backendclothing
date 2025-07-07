import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

export default function Support() {

    const navigate = useNavigate();

    const handleTrackClick = () => {
        const userId = localStorage.getItem("userlogin");
        if (userId) {
            navigate("/Track");
        } else {
            alert("Please log in to track your order.");
        }
    };
    return (
        <>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%" }}>
                <Navbar />
            </div>
            <div className="d-flex justify-content-center mt-5 px-5">
                <div className="col-lg-6 mt-5 p-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.37343964339!2d75.774271768568!3d30.90031908946707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1747990440459!5m2!1sen!2sin"
                        width="100%"
                        height="550"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map - Ludhiana Punjab"
                    />
                </div>

                <div class="container py-5 col-lg-6">
                    {/* <h2 class="text-center mt-5 mb-4">Support & Help</h2> */}
                    <section>
                        <h4 class="mb-3 mt-5">Contact Us</h4>
                        <p>Email us at <strong>support@rollistear.com</strong> or call <strong>+91-9876543210</strong></p>
                        <form>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="Your name" required />
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Your email" required />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="phone" class="form-label">Phone Number</label>
                                    <input type="tel" class="form-control" id="phone" placeholder="Your phone number" required />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control" id="message" rows="4" placeholder="Write your message..." required></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark">Submit</button>
                        </form>
                    </section>
                    {/* <!-- FAQs --> */}


                    {/* <!-- Contact Form --> */}
                </div>
            </div>
            <div className="px-5">
                <section class="mb-3">
                    <h4 class="mb-3 mt-4">Frequently Asked Questions</h4>
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    What is the delivery time?
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Orders are delivered within 3–7 business days depending on your location.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    How can I track my order?
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    After shipping, you’ll receive a tracking link via email and SMS.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    Can I return or exchange my order?
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Yes, within 7 days of delivery. Items must be unused and in original packaging.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="px-1">
                    <h4>Customer Support</h4>
                    <p>If you need help with an order, payment, or delivery, you’re in the right place.</p>

                    <div>
                        <h4>Track Your Order</h4>
                        <p>Find the status and estimated delivery of your recent orders.</p>
                        <button className="btn btn-outline-dark" onClick={handleTrackClick}>Track My Order</button>
                    </div>
                </div>

                {/* <!-- Shipping & Returns Policy --> */}
                <section class="mb-5">
                    <h4 class="mt-4">Shipping & Returns Policy</h4>
                    <p>We offer free shipping on orders above ₹999. Orders are shipped within 2–3 business days and delivered within 3–7 business days.</p>
                    <p>If you're not satisfied with your purchase, you can return it within 7 days. Products must be unused and in original packaging. Refunds are processed within 7 working days.</p>
                    <p>For exchanges, please mention your new size while requesting the return. Return shipping is free on your first exchange.</p>
                </section>
            </div>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0 mt-5">
                <Newsletter />
            </div>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0 bottom-0 w-100">
                <Footer />
            </div>
        </>
    )
}