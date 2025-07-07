import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { Typography } from '@mui/material';

export default function Newlaunches() {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setproducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(10000);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const navi = useNavigate();

    useEffect(() => {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((res) => {
            setproducts(res.data);
        });
        axios.post("https://backendclothing-3.onrender.com/fetchcategories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.Productname);
        const matchesPrice = product.Price <= priceRange;

        // Ensure product.Size is an array or string
        const matchesSize = selectedSizes.length === 0 ||
            (Array.isArray(product.Size)
                ? product.Size.some(size => selectedSizes.includes(size))
                : selectedSizes.includes(product.Size));

        const isNewLaunch = product.Status && product.Status.includes("newlaunch");

        return matchesCategory && matchesPrice && matchesSize && isNewLaunch;
    });

    return (
        <>
            <div className="container-fluid shop-page p-0">
                <Navbar />

                <main className="row m-0">
                    {/* Sidebar */}
                    <aside className="col-lg-2 col-md-3 d-none d-md-block bg-light p-4 filter-sidebar">
                        <h6 className="fw-bold mb-3">Filters</h6>

                        {/* Category Filter */}
                        <div className="mb-3">
                            <label className="form-label">Categories</label>
                            <div>
                                {categories.map((row) => (
                                    <div key={row._id}>
                                        <input
                                            type="checkbox"
                                            id={row.Catname}
                                            checked={selectedCategories.includes(row.Catname)}
                                            onChange={(e) => {
                                                const { checked } = e.target;
                                                setSelectedCategories(prev =>
                                                    checked
                                                        ? [...prev, row.Catname]
                                                        : prev.filter(c => c !== row.Catname)
                                                );
                                            }}
                                        />
                                        &nbsp;<label htmlFor={row.Catname}>{row.Catname}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-3">
                            <label className="form-label">Price Range</label>
                            <div className='d-flex align-items-center'>
                                <Typography variant='inherit' color='black'>₹0</Typography>&nbsp;
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="10000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                />
                                <Typography variant='inherit' color='black'>₹{priceRange}</Typography>
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="mb-3">
                            <label className="form-label">Size</label>
                            <div className="d-flex flex-wrap gap-2">
                                {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                                    <span
                                        key={size}
                                        className={`badge ${selectedSizes.includes(size) ? "bg-dark" : "bg-secondary"}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedSizes(prev =>
                                                prev.includes(size)
                                                    ? prev.filter(s => s !== size)
                                                    : [...prev, size]
                                            )
                                        }
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <section className="col-md-10 p-4">
                        {/* Filter Button for Mobile */}
                        <div className="d-md-none mb-3">
                            <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center" onClick={() => setIsFilterOpen(true)}>
                                <i className="fas fa-sliders-h me-2"></i> Filter & Sort
                            </button>
                        </div>

                        <div className='d-flex align-items-center justify-content-start flex-wrap'>
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="col-6 col-lg-3 col-md-6 mb-4 p-2">
                                    <div className="product-card p-3 border bg-white h-100 d-flex flex-column">
                                        <img
                                            src={product.Images}
                                            alt={product.Productname}
                                            className="img-fluid mb-2"
                                            style={{ objectFit: "cover", height: "250px", borderRadius: "8px" }}
                                        />
                                        <h6 className="mb-1 fw-bold">{product.Productname}</h6>
                                        <p className="text-muted small flex-grow-1">
                                            {product.Description.slice(0, 30) + "..."}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted fs-6">Rs.{product.Price}</small>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => navi("/Viewproduct?id=" + product._id)}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Filter Drawer (Mobile Only) - Static Placeholder */}
                {isFilterOpen && (
                    <>
                        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white filter-drawer open p-4 z-index-1050" style={{ overflowY: 'auto' }}>
                            <button className="btn btn-sm btn-outline-dark mb-3" onClick={() => setIsFilterOpen(false)}>Close</button>
                            <h6 className="fw-bold mb-3">Filters</h6>
                            <div className="mb-3">
                                <label className="form-label">Categories</label>
                                <div>
                                    <input type="checkbox" id="mobile-shirts" /> <label htmlFor="mobile-shirts">Shirts</label><br />
                                    <input type="checkbox" id="mobile-pants" /> <label htmlFor="mobile-pants">Pants</label><br />
                                    <input type="checkbox" id="mobile-jackets" /> <label htmlFor="mobile-jackets">Jackets</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price Range</label>
                                <input type="range" className="form-range" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Size</label>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-secondary">S</span>
                                    <span className="badge bg-secondary">M</span>
                                    <span className="badge bg-secondary">L</span>
                                    <span className="badge bg-secondary">XL</span>
                                </div>
                            </div>
                        </div>
                        <div className="overlay active position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" onClick={() => setIsFilterOpen(false)}></div>
                    </>
                )}
            </div>

            <div className="row m-0 mt-0 align-items-center justify-content-center d-flex flex-wrap p-0">
                <Newsletter />
            </div>
            <div className="row m-0 mt-0 bg-dark align-items-center justify-content-center d-flex flex-wrap p-0">
                <Footer />
            </div>
        </>
    );
}
