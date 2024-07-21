import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";

function AdminHeader() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const adminlogout = () => {
        localStorage.removeItem("Token_key");
        navigate("/");
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="md:hidden mr-4">
                        <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    <Link to="/admin" className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-8 mr-4" />
                        <h1 className="text-lg font-semibold text-gray-800">Brush & Beyond</h1>
                    </Link>
                </div>
                <nav className="hidden md:flex space-x-14">
                    <ul className="flex space-x-0">
                        <li><NavLink to="/admin/contactdetails" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Contact Details</NavLink></li>
                        <li><NavLink to="/admin/feedbackdetails" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Feedback Details</NavLink></li>
                        <li><NavLink to="/admin/uploadevents" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Upload Events</NavLink></li>
                        <li><NavLink to="" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`} onClick={adminlogout}>Logout</NavLink></li>

                    </ul>
                </nav>
            </div>


            <nav className={`md:hidden ${isOpen ? 'flex justify-center' : 'hidden'}`}>
                <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-2">
                    <ul className="flex flex-col space-y-2">
                        <li><NavLink to="/admin/contactdetails" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Contact Details</NavLink></li>
                        <li><NavLink to="/admin/feedbackdetails" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Feedback Details</NavLink></li>
                        <li><NavLink to="/admin/uploadevents" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Upload Events</NavLink></li>
                        <li><NavLink to="" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`} onClick={adminlogout}>Logout</NavLink></li>

                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default AdminHeader;
