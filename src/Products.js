import { useEffect, useRef, useState } from "react";
import Sidebaradmin from "./Sidebaradmin";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsCircleSquare } from "react-icons/bs";
import axios from "axios";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function Products() {

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [formData, setFormData] = useState({
        productname: '',
        category: '',
        subcategory: '',
        type: '',
        size: [],
        price: '',
        stock: '',
        images: '',
        description: '',
        status: ''
    });


    function submitform(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const productname = data.get("productname");
        const category = data.get("category");
        const subcategory = data.get("subcategory");
        const type = data.get("type");
        const size = data.getAll("size");
        const price = data.get("price");
        const stock = data.get("stock");
        const images = data.get("images");
        const description = data.get("description");
        const status = data.get("status");

        const payload = {
            Productname: productname,
            Category: category,
            Subcategory: subcategory,
            Type: type,
            Size: size,
            Price: price,
            Stock: stock,
            Images: images,
            Description: description,
            Status: status,
        };

        if (editMode) {
            axios.post("https://backendclothing-3.onrender.com/updateproduct", {
                ...payload,
                _id: editProductId
            }).then((res) => {
                alert("Product updated successfully!");
                setEditMode(false);
                setEditProductId(null);
                fetchform();
            });
        } else {
            axios.post("https://backendclothing-3.onrender.com/addproduct", payload).then((succ) => {
                alert("Product added successfully!");
            });
        }
    }

    const [products, setproducts] = useState([]);

    function fetchform() {
        axios.post("https://backendclothing-3.onrender.com/fetchproducts").then((succ) => {
            setproducts(succ.data);
        })
    }

    useEffect(() => {
        fetchform();
    }, [])

    function deletee(x) {
        axios.post("https://backendclothing-3.onrender.com/deleteproducts", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("Product removed successfully");
                fetchform();
            }
        });
    }

    const [categories, setCategories] = useState([]);

    function fetchcategories() {
        axios.post("https://backendclothing-3.onrender.com/fetchcategories").then((succ) => {
            setCategories(succ.data);
        })
    }

    useEffect(() => {
        fetchcategories();
    }, [])

    return (
        <>
            <div className="d-flex flex-lg-row">
                <div className="vh-100 position-fixed shadow" style={{ width: "250px", height: "100vh", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2 p-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">Products</h4>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                            <BsCircleSquare className="me-2" />
                            Add Product
                        </button>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "scroll" }}>
                                <table className="table table-hover align-middle mb-0" >
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Subcategory</th>
                                            <th>Material Type</th>
                                            <th>Size</th>
                                            <th>Stock Availability</th>
                                            <th>Status</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((row, index) => (
                                            <tr className="align-items-center">
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={row.Images} className="rounded" /></td>
                                                <td>{row.Productname}</td>
                                                <td>{row.Category}</td>
                                                <td>{row.Subcategory}</td>
                                                <td>{row.Type}</td>
                                                <td>
                                                    {Array.isArray(row.Size) ? row.Size.join(", ") : row.Size}
                                                </td>
                                                <td>
                                                    <span className={`badge ${row.Stock === 'In Stock' ? 'bg-success' : 'bg-danger'}`}>
                                                        {row.Stock}
                                                    </span>
                                                </td>
                                                <td>{Array.isArray(row.Status) ? row.Status.join(", ") : row.Status}</td>
                                                <td>₹{row.Price}</td>
                                                <td className="d-flex" style={{ height: "70px" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        // data-bs-toggle="modal"
                                                        // data-bs-target="#addProductModal"
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setEditProductId(row._id);
                                                            setFormData({
                                                                productname: row.Productname,
                                                                category: row.Category,
                                                                subcategory: row.Subcategory,
                                                                type: row.Type,
                                                                size: row.Size,
                                                                price: row.Price,
                                                                stock: row.Stock,
                                                                images: row.Images,
                                                                description: row.Description,
                                                                status: row.Status,
                                                            });
                                                            setShowModal(true)
                                                        }}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-outline-danger ms-2" onClick={() => deletee(row._id)} >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Modal for Add Product */}
                    {showModal && (
                        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Product</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="row g-3" onSubmit={submitform}>
                                            <div className="col-md-6">
                                                <label className="form-label">Product Name</label>
                                                <input type="text" name="productname" value={formData.productname} onChange={(e) => setFormData({ ...formData, productname: e.target.value })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Category</label>
                                                <select id="category" className="form-select" placeholder="Category" name="category" value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} required >
                                                    <option value="">Select Category</option>
                                                    <option value="men">Men</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Subcategory</label>
                                                <select id="subcategory" name="subcategory" className="form-select"
                                                    value={formData.subcategory}
                                                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}>
                                                    <option value="">Select your Category</option>
                                                    {categories.map((row) => (
                                                        <option value={row.Catname}>{row.Catname}</option>
                                                    ))}

                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Product Type</label>
                                                <select id="type" className="form-select" name="type"
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option value="">Select your material</option>
                                                    <option value="drawstring">Drawstring</option>
                                                    <option value="dry-fit">Dry Fit</option>
                                                    <option value="cotton">Cotton</option>
                                                    <option value="printed">Printed</option>
                                                    <option value="denim">Denim</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Sizes</label>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                                                        <div className="form-check">
                                                            <input name="size" className="form-check-input" type="checkbox" value={size}
                                                                // value={formData.catname}
                                                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                                            // onChange={(e) => handleCheckbox(e, "sizes")}
                                                            />
                                                            <label className="form-check-label">{size}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Price (₹)</label>
                                                <input type="number" id="price" name="price" className="form-control"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Stock Available</label>
                                                <select id="stock" className="form-select" name="stock" value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })} >
                                                    <option value="">Select availability</option>
                                                    <option value="In Stock">In Stock</option>
                                                    <option value="Out of stock">Out of stock</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Images</label>
                                                <input type="url" name="images" className="form-control" placeholder="Insert URL"
                                                    value={formData.images}
                                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                                // onChange={handleFileChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Description</label>
                                                <textarea id="description" className="form-control" rows="3" name="description" placeholder="Add product description"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Status</label>
                                                <div className="d-flex gap-3">
                                                    {["featured", "bestselling", "newlaunch"].map((status) => (
                                                        <div className="form-check" key={status}>
                                                            <input name="status" className="form-check-input" type="checkbox" value={status}
                                                                // value={formData.catname}
                                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                            />
                                                            <label className="form-check-label text-capitalize">{status}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-end right-0">
                                                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary">
                                                    Save Product
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}