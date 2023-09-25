import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate()
    const userLogout = async () => {
        const confirmLogout = window.confirm('Are you sure, you want to log out?');

        if (confirmLogout) {
            try {
                const res = await axios.post('/vendorlogout', {
                    withCredentials: true
                });

                if (res.status === 200) {
                    window.alert(res.data.msg);
                    navigate('/login');
                }
            } catch (error) {
                window.alert('Some error occurred');
            }
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid j">
                    <NavLink className="navbar-brand" to="/"><img className='navlogo' src={logo} alt="Logo" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About Me</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">Orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">Register</NavLink>
                            </li>

                            <li className="nav-item">
                                <p style={{ cursor: 'pointer' }} className="nav-link" onClick={userLogout}>Logout</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
