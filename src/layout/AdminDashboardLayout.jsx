import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="grid grid-cols-12 min-h-screen">
                <aside className="col-span-2 bg-base-200 p-5">
                    <ul className="menu">
                        <li><NavLink to="profile">Admin Profile</NavLink></li>
                        <li><NavLink to="manage-tickets">Manage Tickets</NavLink></li>
                        <li><NavLink to="manage-users">Manage Users</NavLink></li>
                        <li><NavLink to="advertise">Advertise Tickets</NavLink></li>
                    </ul>
                </aside>
                <main className="col-span-9 p-6">
                    <Outlet />
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AdminDashboard;
