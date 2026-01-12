import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="text-center h-screen pt-80 "><span className="loading loading-bars loading-xl"></span></div>;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
