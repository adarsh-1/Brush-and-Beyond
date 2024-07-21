import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";

function ArtistHeader() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const logout = () => {
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
                    <Link to="/user" className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-8 mr-4" />
                        <h1 className="text-lg font-semibold text-gray-800">Brush & Beyond</h1>
                    </Link>
                </div>
                <nav className="hidden md:flex space-x-14">
                    <ul className="flex space-x-0">
                        <li><NavLink to="/user" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Profile</NavLink></li>
                        <li><NavLink to="/user/artistlist" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Artists</NavLink></li>
                        <li><NavLink to="/user/artworks" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Artworks</NavLink></li>
                        <li><NavLink to="/user/myorders" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Myorders</NavLink></li>
                        <li><NavLink to="" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`} onClick={logout}>Logout</NavLink></li>

                    </ul>
                </nav>
            </div>


            <nav className={`md:hidden ${isOpen ? 'flex justify-center' : 'hidden'}`}>
                <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-2">
                    <ul className="flex flex-col space-y-2">
                        <li><NavLink to="/user" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Profile</NavLink></li>
                        <li><NavLink to="/user/artistlist" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Artists</NavLink></li>
                        <li><NavLink to="/user/artworks" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Artworks</NavLink></li>
                        <li><NavLink to="/user/myorders" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Myorders</NavLink></li>
                        <li><NavLink to="" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`} >Logout</NavLink></li>

                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default ArtistHeader;
