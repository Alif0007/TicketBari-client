import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/home/Home";




const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: "/",
                Component: Home
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
    }
]);


export default router