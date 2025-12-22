import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axiosPublic from '../utils/axiosPublic';
import AdminDashboard from './AdminDashboardLayout';
import VendorDashboardLayout from '../pages/dashboard/vendor/VendorDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const { user, loading } = useAuth();

    const [role, setRole] = useState("")

    useEffect(() => {
        axiosPublic.get(`users/${user.email}/role`)
            .then(res => setRole(res.data.role))
    }, [user.email])


    if (loading) {
        return <div>Loading.....</div>
    }

    if (role === "admin") {
        return <AdminDashboard />
    }

    if (role === "vendor") {
        return <VendorDashboardLayout />
    }

    if (role === "user") {
        return <UserDashboard />
    }


    <div>
        sdasdasdds Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptas recusandae nobis eveniet illo autem ad tenetur reiciendis quo in vitae exercitationem sed, nesciunt aperiam obcaecati, tempora debitis, eos doloremque modi ipsam est quisquam cumque. Quos ipsum sit rem in obcaecati? Nisi animi aliquid ab.
    </div>

};

export default DashboardHome;