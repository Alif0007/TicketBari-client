import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

            <div>
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default AuthLayout;