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
// import RevenueOverview from "../pages/dashboard/vendor/RevenueOverview";
import VendorDashboardLayout from "../pages/dashboard/vendor/VendorDashboard";




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
        path: "/dashboard/vendor",
        element: <VendorDashboardLayout />,
        children: [
            { path: "profile", element: <VendorProfile /> },
            { path: "add-ticket", element: <AddTicket /> },
            { path: "my-tickets", element: <MyTickets /> },
            { path: "requested-bookings", element: <RequestedBookings /> },

        ]
    }
]);


export default router