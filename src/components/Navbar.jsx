import React from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../assets/logo.png'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../authProvider/AuthProvider';
import { CiCircleChevDown, CiUser } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const { user, signOutUser, setUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Logged Out Successfully');
                setUser(null);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Logout failed');
            });
    };

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`
                }
            >
                <li>Home</li>
            </NavLink>
            <NavLink
                to="/all-tickets"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`
                }
            >
                <li>All Tickets</li>
            </NavLink>

            {user && (
                <>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                            }`
                        }
                    >
                        <li>Dashboard</li>
                    </NavLink>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg shadow-blue-50/50">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">
                    <div className='flex'>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-4 shadow">
                                {links}
                            </ul>
                        </div>
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-3 group">
                                <img
                                    className="h-10 w-auto transition-transform duration-300 scale-150 hover:scale-170"
                                    src={logo}
                                    alt="Logo"
                                />

                            </Link>
                        </div>
                    </div>
                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <ul className="flex items-center space-x-1">
                            {links}
                        </ul>
                    </div>

                    {/* Right Section - User/Auth */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {/* User Info */}
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-800">
                                        {user.displayName || 'User'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {user.email}
                                    </span>
                                </div>

                                {/* User Avatar with Dropdown */}
                                <div className="relative group">
                                    <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <div className="relative">
                                            <img
                                                src={user.photoURL || "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full border-2 border-white shadow-lg ring-2 ring-blue-100 transition-all duration-300 group-hover:ring-blue-300 group-hover:scale-105"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>

                                        {/* Dropdown Menu */}
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                                        {user.photoURL ? (
                                                            <img
                                                                src={user.photoURL}
                                                                alt="Profile"
                                                                className="w-full h-full rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <CiUser className="w-6 h-6 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    <CiUser className="w-5 h-5" />
                                                    <span>My Profile</span>
                                                </Link>

                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 mt-1"
                                                >
                                                    <FiLogOut className="w-5 h-5" />
                                                    <span>Log Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:scale-95">
                                    Login
                                </button>
                            </Link>
                        )}


                    </div>
                </div>
            </div>



        </nav>
    );
};

export default Navbar;