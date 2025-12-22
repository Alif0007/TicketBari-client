import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/home/Home";
import PrivateRoute from "../components/PrivateRoute";
import AllTickets from "../pages/AllTickets";
import TicketDetails from "../pages/TicketDetails";

import VendorProfile from "../pages/dashboard/vendor/VendorProfile";
import AddTicket from "../pages/dashboard/vendor/AddTicket";
import MyTickets from "../pages/dashboard/vendor/MyTickets";
import RequestedBookings from "../pages/dashboard/vendor/RequestedBookings";

import VendorDashboardLayout from "../pages/dashboard/vendor/VendorDashboard";
import RevenueOverview from "../pages/dashboard/vendor/RevenueOverview";
import AdminDashboard from "../layout/AdminDashboardLayout";
import ManageTickets from "../pages/dashboard/admin/ManageTickets";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdvertiseTickets from "../pages/dashboard/admin/AdvertiseTickets";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import DashboardHome from "../layout/DashboardHome";
import UserDashboard from "../layout/UserDashboard";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import UserProfile from "../pages/dashboard/user/UserProfile";
import MyBookings from "../pages/dashboard/user/MyBookings";
import ErrorPage from "../pages/ErrorPage";




const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: "/",
                Component: Home
            }, {
                path: "/all-tickets",
                element: (
                    <PrivateRoute>
                        <AllTickets />
                    </PrivateRoute>
                )
            },
            {
                path: "/ticket/:id",
                element: (
                    <PrivateRoute>
                        <TicketDetails />
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/login",
                Component: Login
            }, {
                path: "/register",
                Component: Register
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
    },
    {
        path: "/dashboard",
        element: < PrivateRoute >
            <VendorDashboardLayout />
        </PrivateRoute >,
        children: [
            { path: "vendor-profile", element: <VendorRoute><VendorProfile /></VendorRoute> },
            { path: "add-ticket", element: <VendorRoute> <AddTicket /></VendorRoute> },
            { path: "my-tickets", element: <VendorRoute> <MyTickets /></VendorRoute> },
            { path: "requested-bookings", element: <VendorRoute> <RequestedBookings /> </VendorRoute> },
            { path: "revenue-overview", element: <VendorRoute> <RevenueOverview /></VendorRoute> }

        ]
    },


    {
        path: "/dashboard",
        element: < PrivateRoute >
            <AdminDashboard />
        </PrivateRoute >,
        children: [
            { path: "admin-profile", element: <AdminRoute><AdminProfile /></AdminRoute> },
            { path: "manage-tickets", element: <AdminRoute><ManageTickets /></AdminRoute> },
            { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
            { path: "advertise", element: <AdminRoute><AdvertiseTickets /></AdminRoute> }


        ]
    },
    {
        path: "/dashboard",
        element: < PrivateRoute >
            <UserDashboard />
        </PrivateRoute >,
        children: [
            { path: "user-profile", element: <UserProfile /> },
            { path: "my-bookings", element: <MyBookings></MyBookings> },
            { path: "transactions", element: <AdminRoute><ManageUsers /></AdminRoute> },
            { path: "advertise", element: <AdminRoute><AdvertiseTickets /></AdminRoute> }


        ]
    },
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>
    }
]);


export default router