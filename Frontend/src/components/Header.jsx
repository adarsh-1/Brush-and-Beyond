import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";
// import axios from 'axios'; // Import axios for making HTTP requests

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
    const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSignUpMenu = () => {
        setIsSignUpMenuOpen(!isSignUpMenuOpen);
    };

    const toggleLoginMenu = () => {
        setIsLoginMenuOpen(!isLoginMenuOpen);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeSignUpMenu = () => {
        setIsSignUpMenuOpen(false);
    };

    const closeLoginMenu = () => {
        setIsLoginMenuOpen(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const openSearchPopup = () => {
        setIsSearchPopupOpen(true);
    };

    const closeSearchPopup = () => {
        setIsSearchPopupOpen(false);
    };

    const handleSearch = () => {
        navigate(`/searchResults?keyword=${searchKeyword}`);
        setIsSearchPopupOpen(false);
    };

    return (
        <header className="bg-white shadow-md relative z-20">
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
                    <Link to="/" className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-8 mr-4" />
                        <h1 className="text-lg font-semibold text-gray-800">Brush & Beyond</h1>
                    </Link>
                </div>
                <nav className="hidden md:flex space-x-14">
                    <ul className="flex space-x-0">
                        <li><NavLink to="/aboutus" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>About Us</NavLink></li>
                        <li><NavLink to="/contactus" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Contact Us</NavLink></li>
                        <li><NavLink to="/feedback" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Feedback</NavLink></li>
                        <li><NavLink to="/events" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Events</NavLink></li>
                        <li className="relative z-30 ">
                            <button onClick={toggleSignUpMenu} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">SignUp</button>
                            {isSignUpMenuOpen && (
                                <ul className="absolute bg-white shadow-md py-2 mt-2 w-32 rounded-md z-40" >
                                    <li><Link onClick={closeSignUpMenu} to="/usersignup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SignUp User</Link></li>
                                    <li><Link onClick={closeSignUpMenu} to="/artistsignup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SignUp Artist</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="relative z-30">
                            <button onClick={toggleLoginMenu} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">LogIn</button>
                            {isLoginMenuOpen && (
                                <ul className="absolute bg-white shadow-md py-2 mt-2 w-32 rounded-md z-40" >
                                    <li><Link onClick={closeLoginMenu} to="/userlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn User</Link></li>
                                    <li><Link onClick={closeLoginMenu} to="/artistlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn Artist</Link></li>
                                    <li><Link onClick={closeLoginMenu} to="/adminlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn Admin</Link></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={openSearchPopup} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">Search</button>
                        </li>
                    </ul>
                </nav>

                {/* Search Popup */}
                {isSearchPopupOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-4 rounded-md">
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                placeholder="Search artist by city..."
                            />
                            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
                            <button onClick={closeSearchPopup} className="text-gray-600 ml-2 hover:text-gray-800 focus:outline-none">
                                <svg className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

            </div>
            <nav className={`md:hidden ${isOpen ? 'flex justify-center' : 'hidden'}`}>
                <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-2">
                    <ul className="flex flex-col space-y-2">
                        <li><NavLink to="/aboutus" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>About Us</NavLink></li>
                        <li><NavLink to="/contactus" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Contact Us</NavLink></li>
                        <li><NavLink to="/feedback" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Feedback</NavLink></li>
                        <li><NavLink to="/events" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"}`}>Events</NavLink></li>
                        <li className="relative z-30">
                            <button onClick={toggleSignUpMenu} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">SignUp</button>
                            {isSignUpMenuOpen && (
                                <ul className="absolute bg-white shadow-md py-2 mt-2 w-32 rounded-md z-40" >
                                    <li><Link onClick={closeSignUpMenu} to="/usersignup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SignUp User</Link></li>
                                    <li><Link onClick={closeSignUpMenu} to="/artistsignup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SignUp Artist</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="relative z-30">
                            <button onClick={toggleLoginMenu} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">LogIn</button>
                            {isLoginMenuOpen && (
                                <ul className="absolute bg-white shadow-md py-2 mt-2 w-32 rounded-md z-40" >
                                    <li><Link onClick={closeLoginMenu} to="/userlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn User</Link></li>
                                    <li><Link onClick={closeLoginMenu} to="/artistlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn Artist</Link></li>
                                    <li><Link onClick={closeLoginMenu} to="/adminlogin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LogIn Admin</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="relative z-30">
                            <button onClick={openSearchPopup} className="block py-2 pr-4 pl-3 duration-200 text-gray-700">Search</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
