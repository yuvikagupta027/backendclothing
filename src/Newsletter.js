import React, { useState } from 'react';

export default function Newsletter() {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (email.includes('@') && email.includes('.')) {
            setSuccess(true);
            setEmail('');
            setTimeout(() => setSuccess(false), 5000);
        }
    };

    return (
        <>
            <section className="py-5 px-3" style={{ backgroundColor: " #f5f5f0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h2 className="display-6 fw-light">Refine Your Wardrobe.<br />First Access Starts Here.</h2>
                            <p className="text-muted mt-3">Join our list for insider updates, early access to new collections, and exclusive offers crafted just for you.</p>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control newsletter-input"
                                        placeholder="Email Address"
                                        name='emailsignup'
                                        // value={email}
                                    />
                                </div>
                                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
                                    <button type="submit" className="btn btn-dark text-white px-4 py-2 text-uppercase">
                                        Subscribe Now
                                    </button>
                                    <small className="text-muted mt-2 mt-md-0 ms-md-3">No spam. Just timeless style. Unsubscribe anytime.</small>
                                </div>
                                {success && <div className="mt-3 text-success">Thank you for subscribing. Welcome to our community of style.</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}