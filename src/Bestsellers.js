import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Bestsellers() {
    const [products, setProducts] = useState([]);
    const [selProductIndex, setSelProductIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((res) => {
            setProducts(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.error("Failed to fetch products:", err);
        });
    }, []);

    const previous = () => {
        if (products.length > 0) {
            setSelProductIndex((prev) => (prev - 1 + products.length) % products.length);
        }
    };

    const next = () => {
        if (products.length > 0) {
            setSelProductIndex((prev) => (prev + 1) % products.length);
        }
    };

    const handleProductClick = (index) => {
        setSelProductIndex(index % products.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
    };

    const reorderedProducts = [
        ...products.slice(selProductIndex),
        ...products.slice(0, selProductIndex),
    ];

    return (
        <>
            <div className="text-center">
                <h2 className="fw-bold text-dark">
                    Our Bestselling Products
                </h2>
                <p className="text-muted">Chase comfort chase style.</p>
            </div>
            <div
                className="scroll-wrapper menu-slider-container text-white d-flex wrap align-items-center mb-5"
                style={{
                    backgroundImage: `url(${products.length > 0 ? products[selProductIndex].Images : "https://www.signcomplex.com/uploads/image/20220513/15/led-tube-lamp.jpg"})`,
                    backgroundSize: "30% auto",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100vh",
                }}
            >
                <div className="overlay"></div>

                <div className="left-text col-md-4 col-sm-4 px-lg-5 slide-in text-dark" style={{ zIndex: 2 }}>
                    <h1 className="display-4 fw-bold">
                        {products[selProductIndex]?.Productname?.toUpperCase()}
                    </h1>
                    <p className="lead">{products[selProductIndex]?.Description}</p>
                    <p>Price - ₹ {products[selProductIndex]?.Price}</p>
                    <Link to="/Shop">
                        <button className="btn btn-secondary">Explore Our Shop</button>
                    </Link>
                </div>

                <div className="slider-wrapper-container col-md-8 px-lg-4 my-auto d-flex overflow-hidden" style={{ zIndex: 2 }}>
                    <div className={`scroll-track d-flex ${isPaused ? "paused" : ""}`}>
                        {[...reorderedProducts, ...reorderedProducts].map((row, index) => (
                            <div
                                key={index}
                                className="card-item carditem mx-2"
                                style={{
                                    maxWidth: "220px",
                                    maxHeight: "250px",
                                    cursor: "pointer",
                                    transform: index === 0 ? "scale(1.1)" : "scale(1)",
                                    transition: "transform 0.2s ease",
                                }}
                                onClick={() => handleProductClick(index)}
                            >
                                <img src={row.Images || "https://via.placeholder.com/150"} className="img-fluid rounded menuimg my-2" alt={row.Productname} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="navigation-buttons position-absolute d-flex justify-content-center align-items-center" style={{ zIndex: 3, bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
                    <button className="btn btn-dark text-light me-2" onClick={previous}>
                        <FaChevronLeft />
                    </button>
                    <button className="btn btn-dark text-light" onClick={next}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </>
    );
}