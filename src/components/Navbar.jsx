import React from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../assets/logo.png'

import { use } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../authProvider/AuthProvider';
import { CiCircleChevDown } from 'react-icons/ci';



const Navbar = () => {

    const { user, signOutUser, setUser } = use(AuthContext)

    const handleSignOut = () => {
        signOutUser()
            .then(() => {

                toast.success('Logged Out Succesfully')
                setUser(null)
            }).catch((error) => {
                console.log(error)
            });
    }

    const links = <>
        <NavLink to="/"><li className=' text-lg'>Home</li></NavLink>

        {
            user &&
            <>
                <NavLink to="/all-tickets"><li className=' text-lg'>All Tickets</li></NavLink>
                <NavLink to="/dashboard"><li className=' text-lg'>Dashboard</li></NavLink>


            </>


        }
    </>



    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm z-10">
                <div className="navbar-start">
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
                    <div>
                        <Link to="/"><img className='h-10 scale-200 pl-2' src={logo} alt="" /></Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">

                    {
                        user ? <div className='flex items-center gap-4 ml-5'>


                            <img

                                src={user.photoURL ? user.photoURL : "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full  border border-orange-300 shadow-md "
                            />
                            <span className=' font-semibold'>{user.displayName}</span>
                            <div className='flex flex-col items-center'>

                                <div className="dropdown dropdown-center">
                                    <div tabIndex={0} role="button" className="cursor-pointer m-1 flex items-center">

                                        <CiCircleChevDown />

                                    </div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li className='ml-5 font-semibold cursor-pointer'>My Profile</li>

                                        <li><Link to="/login"><div onClick={handleSignOut} className="btn bg-red-600 text-white ">Log Out</div> </Link></li>

                                    </ul>
                                </div>



                            </div>

                        </div> :
                            <Link to="/login"><div className="btn bg-blue-600 text-white disabled">Login</div> </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;