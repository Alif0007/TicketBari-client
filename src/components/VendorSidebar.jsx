import { NavLink } from "react-router";

const VendorSidebar = () => {
    return (
        <div className="w-64 bg-base-100 shadow-lg p-5">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Vendor Panel
            </h2>

            <ul className="menu gap-2">
                <li>
                    <NavLink to="/dashboard/vendor/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/vendor/add-ticket">Add Ticket</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/vendor/my-tickets">My Tickets</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/vendor/requested-bookings">
                        Requested Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/vendor/revenue-overview">Revenue Overview</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default VendorSidebar;
