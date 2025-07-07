import React, { useState } from "react";
import Navbar from "./Navbar";
import Bestsellers from "./Bestsellers";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Home() {

    const categories = [
        { title: "T-Shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", badge: "BESTSELLER", description: "Premium cotton tees designed for comfort and style. From minimalist designs to bold statements." },
        { title: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", badge: "NEW ARRIVALS", description: "Tailored perfection for every occasion. From casual linens to formal dress shirts." },
        { title: "Coords", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", badge: "TRENDING", description: "Perfectly matched sets for effortless style. Contemporary designs with impeccable fit." },
        { title: "Trackpants", image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", description: "Athletic-inspired comfort with urban style. Perfect for workouts or casual wear." },
        { title: "Shorts", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQvyeSxeA_3ZwJTvROP3ARzCVRnmq2D4J1ykCW6H1ymQy_GvtuqUNlDG9A6gsau0E1ut2tNzzM7ALpr6gZYtQXLqL8ohPZhg72b-D9Wodm5Y8R9nz16ZQJOpA&usqp=CAc", badge: "SUMMER EDIT", description: "Breathable fabrics and modern cuts. From casual to athletic styles for warmer days." },
        { title: "Capris", image: "https://m.media-amazon.com/images/I/71Q+Oo6K-KL._AC_UY1100_.jpg", description: "The perfect balance between shorts and pants for relaxed yet polished vibes." },
    ];

    const values = [
        { icon: '👔', title: 'Unmatched Comfort', text: ' Every piece is crafted with premium fabrics that feel as good as they look — whether you\'re at work, on a date, or just chilling.' },
        { icon: '✨', title: 'Effortless Style', text: 'Our designs blend classic tailoring with modern trends, helping you stay sharp without trying too hard.' },
        { icon: '🧵', title: 'Quality That Lasts', text: 'We don’t believe in fast fashion. Jerry Sports pieces are made to last — in both durability and timeless design.' },
        { icon: '💪', title: 'Made for Real Men', text: 'Whether you\'re built for suits or streetwear, we design for men of all shapes, sizes, and walks of life.' },
        { icon: '🔥', title: 'Confidence You Can Wear', text: 'When you wear Jerry Sports, you’re not just wearing clothes — you’re wearing confidence, identity, and purpose.' },
    ];

    const stats = [
        { icon: '⭐', text: '5,000+ Happy Customers' },
        { icon: '📦', text: 'Free Shipping & Easy Returns' },
        { icon: '🧼', text: 'Machine-Wash Friendly' },
        { icon: '🌱', text: 'Ethically Produced' },
    ];

    const collections = [
        { title: "Summer Essentials", description: "Light fabrics for hot days", image: "https://i.pinimg.com/736x/23/0f/4c/230f4cc6e70bfa8d7977201565c553d8.jpg" },
        { title: "Office Wear", description: "Professional attire for the modern man", image: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lbiUyMHN1aXR8ZW58MHx8MHx8fDA%3D" },
        { title: "Street Style", description: "Trendy fits for casual outings", image: "https://c0.wallpaperflare.com/preview/645/468/885/male-tie-dye-rj-paraty.jpg" },
        { title: "Winter Classics", description: "Warm styles for cold weather", image: "https://www.gentlemansflair.com/content/images/2024/05/Topcoat-Chunky-Turtleneck-2-1.jpg" },
    ];

    return (
        <>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 10, opacity: 0.8 }}>
                <Navbar />
            </div>

            <div className="w-100">
                <div className="align-items-center justify-content-center vh-100">
                    <div id="mycaro" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/images/3.png" className="d-block w-100 img-fluid" style={{ height: "100vh", objectFit: "contain" }} alt="Slide 1" />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/1.png" className="d-block w-100 img-fluid" style={{ height: "100vh", objectFit: "contain" }} alt="Slide 2" />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/2.PNG" className="d-block w-100 img-fluid" style={{ height: "100vh", objectFit: "contain" }} alt="Slide 3" />
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#mycaro" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#mycaro" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <section className="container">
                <div className="text-center mb-5 mt-5">
                    <h2 className="fw-bold text-dark">
                        Featured Categories
                    </h2>
                    <p className="text-muted">Explore our top picks hand-selected for the modern man.</p>
                </div>
                <div className="row g-4">
                    {categories.map((cat, index) => (
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-5" key={index}>
                            <div className="category-card h-100 position-relative overflow-hidden rounded-4">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                />
                                <span className="badge badge-overlay">{cat.badge}</span>
                                <div className="category-overlay d-flex flex-column justify-content-end p-4">
                                    <h5 className="text-white fw-bold">{cat.title}</h5>
                                    <p className="text-light small">{cat.description}</p>
                                    <Link to="/Shop">
                                        <button className="btn shop-btn mt-2">Shop Collection</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap vh-100" id="bestsellers" >
                <Bestsellers />
            </div>
            <section className="py-5 bg-light mt-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-2">Featured Collections</h2>
                        <p className="text-muted">Explore our latest seasonal collections</p>
                    </div>

                    <div className="row g-4">
                        {collections.map((item, index) => (
                            <div className="col-md-6 col-sm-6 col-lg-3" key={index}>
                                <div
                                    className="position-relative rounded overflow-hidden shadow"
                                    style={{
                                        height: "380px",
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                                        }}
                                    ></div>
                                    <div className="position-absolute bottom-0 start-0 p-3 text-white">
                                        <h5 className="fw-bold mb-1">{item.title}</h5>
                                        <p className="mb-2 small">{item.description}</p>
                                        <button className="btn btn-light btn-sm fw-medium">
                                            View Collection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="why-choose-section container mt-5 p-5">
                <h2 className="section-title">Why Choose Jerry Sports?</h2>
                <div className="row g-4">
                    {values.map((item, index) => (
                        <div className="col-md-6 col-lg-4 col-sm-6" key={index}>
                            <div className="value-card">
                                <div className="value-icon">{item.icon}</div>
                                <h3 className="value-title">{item.title}</h3>
                                <p className="value-text">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="stats-section mt-5">
                    <h3 className="stats-title">⚡ What You Get with Jerry Sports:</h3>
                    <div className="row">
                        {stats.map((stat, i) => (
                            <div className="col-md-6 col-sm-6" key={i}>
                                <div className="stat-item">
                                    <span className="stat-icon">{stat.icon}</span>
                                    <span className="fw-bold text-dark">{stat.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0 mt-5">
                <Newsletter />
            </div>
            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0 bottom-0 w-100">
                <Footer />
            </div>
        </>
    );
}