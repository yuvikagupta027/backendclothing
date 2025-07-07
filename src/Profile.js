import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebarprofile from "./Sidebarprofile";
import { useLocation } from "react-router-dom";

export default function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [profiles, setProfiles] = useState({
        Username: '',
        Fname: '',
        Lname: '',
        Gender: '',
        Contact: '',
        Email: ''
    });

    const userId = localStorage.getItem("userlogin");

    function fetchUser() {
        console.log(userId)
        if (userId != '') {
            axios.post('https://backendclothing-3.onrender.com/fetchUserOne', {
                ID: userId
            }).then((succ) => {
                console.log(succ.data);
                setProfiles({
                    Username: succ.data.Username,
                    Contact: succ.data.Contact,
                    Email: succ.data.Email,
                });
            })
            console.log(userId)
        }
    }
    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfiles((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(profiles);
    };

    function updatedata(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var ob = profiles;
        Object.assign(ob, {
            Id: userId
        })

        axios.post("https://backendclothing-3.onrender.com/updateprofiledata", ob).then((succ) => {
            alert("data Updated")
            console.log(succ.data);
        })
    }

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-start">
                <div className="col-lg-2 col-md-2">
                    <Sidebarprofile />
                </div>
            </div>
            <div className="container-fluid mt-4">
                <div className="row col-lg-9 col-sm-8 offset-2">
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold">Personal Information</h5>
                            {!editMode && (
                                <span className="btn text-primary cursor-pointer" onClick={() => setEditMode(true)}>
                                    Edit
                                </span>
                            )}
                        </div>
                        <form onSubmit={updatedata}>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name="Username" placeholder="Username" defaultValue={profiles.Username} onChange={handleChange} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name="Fname" placeholder="First name" defaultValue={profiles.Fname} onChange={handleChange} disabled={!editMode} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" name="Lname" placeholder="Last name" value={profiles.Lname} onChange={handleChange} disabled={!editMode} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2">Your Gender</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="Gender" value="Male" checked={profiles.Gender === "Male"} disabled={!editMode} onChange={handleChange} />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="Gender" value="Female" checked={profiles.Gender === "Female"} disabled={!editMode} onChange={handleChange} />
                                    <label className="form-check-label">Female</label>
                                </div>
                            </div>

                            <div className="mb-2 d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold">Email Address</h6>
                            </div>
                            <input type="email" className="form-control mb-4" name="Email" placeholder="email address" value={profiles.Email} onChange={handleChange} disabled={!editMode} />

                            <div className="mb-2 d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold">Mobile Number</h6>
                            </div>
                            <input type="text" className="form-control mb-4" name="Contact" placeholder="contact no." value={profiles.Contact} onChange={handleChange} disabled={!editMode} />

                            {editMode && (
                                <div className="d-flex gap-3">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}