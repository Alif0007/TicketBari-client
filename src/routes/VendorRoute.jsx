import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axiosPublic from "../utils/axiosPublic";
import Forbidden from "../pages/ForbiddenPage";

export default function VendorRoute({ children }) {
    const { user, loading } = useAuth();

    const [role, setRole] = useState("")

    useEffect(() => {
        axiosPublic.get(`users/${user.email}/role`)
            .then(res => setRole(res.data.role))
    }, [user.email])


    if (loading) return <div className="text-center">Loading...</div>;

    if (role !== "vendor") {
        return <div><Forbidden /></div>;
    }

    return children;
}
