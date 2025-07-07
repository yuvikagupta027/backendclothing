import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Sidebaradmin from "./Sidebaradmin";
import axios from "axios";

export default function Categories() {
    const [showToast, setShowToast] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");

    function submitcategories(e) {
        e.preventDefault();
        const createdAt = new Date().toISOString().split("T")[0];

        if (editMode) {
            // Edit mode
            axios.post("https://backendclothing-3.onrender.com/updatecategory", {
                _id: editCategoryId,
                Catname: formData.catname,
                Status: formData.status,
            }).then((res) => {
                alert("Category updated successfully!");
                setShowModal(false);
                setEditMode(false);
                fetchcategories();
            });
        } else {
            // Add mode
            axios.post("https://backendclothing-3.onrender.com/submitcategories", {
                Catname: formData.catname,
                Products: 0,
                Status: formData.status,
                createdAt: createdAt,
            }).then((succ) => {
                alert("Category added successfully");
                setShowModal(false);
                fetchcategories();
            });
        }
    }

    function fetchcategories() {
        axios.post("https://backendclothing-3.onrender.com/fetchcategories").then((succ) => {
            setCategories(succ.data);
        })
    }

    useEffect(() => {
        fetchcategories();
    }, [])

    function deletee(x) {
        axios.post("https://backendclothing-3.onrender.com/deletecategories", {
            Id: x
        }).then((succ) => {
            if (succ.data === "okk") {
                alert("category removed successfully");
                fetchcategories();
            }
        });
    }

    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [formData, setFormData] = useState({ catname: '', status: '' });

    const [searchQuery, setSearchQuery] = useState("");



    return (
        <>
            <div className="d-flex flex-lg-row">
                <div className="vh-100 position-fixed shadow" style={{ width: "250px", zIndex: 1000 }}>
                    <Sidebaradmin />
                </div>
                <div className="col-lg-10 col-10 offset-2 p-5">

                    {showToast && (
                        <div className="position-fixed top-0 end-0 m-4 alert alert-success d-flex align-items-center shadow">
                            <FaPlus className="me-2" />
                            <span>Category added successfully!</span>
                        </div>
                    )}

                    <header className="bg-white shadow-sm border-bottom mb-4 p-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">Category Management</h5>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary d-flex align-items-center">
                            <FaPlus className="me-2" /> Add New Category
                        </button>
                    </header>

                    <div className="bg-white rounded shadow-sm p-4 mb-4">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-4 position-relative">
                                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                <input type="text" className="form-control ps-5" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="col-md-2 d-flex gap-3">
                                <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow-sm overflow-auto">
                        <table className="table table-hover table-bordered align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Products</th>
                                    <th>Status</th>
                                    <th>Created Date</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories
                                        .filter(row =>
                                            (statusFilter === "all" || row.Status === statusFilter) &&
                                            (row.Catname.toLowerCase().includes(searchQuery.toLowerCase()))
                                        )
                                        .map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.Catname}</td>
                                                <td>{row.Products}</td>
                                                <td>
                                                    <span className={`badge ${row.Status === "active" ? "bg-success" : "bg-secondary"}`}>
                                                        {row.Status}
                                                    </span>
                                                </td>
                                                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setEditCategoryId(row._id);
                                                            setFormData({ catname: row.Catname, status: row.Status });
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => deletee(row._id)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-3">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={submitcategories}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Category</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Category Name</label>
                                        <input type="text" className="form-control" name="catname" placeholder="like shirts, tshirts etc." 
                                        value={formData.catname}
                                            onChange={(e) => setFormData({ ...formData, catname: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label> &nbsp;
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="active"
                                                checked={formData.status === "active"}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            />
                                            <label className="form-check-label">Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                value="inactive"
                                                checked={formData.status === "inactive"}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            />
                                            <label className="form-check-label">Inactive</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}