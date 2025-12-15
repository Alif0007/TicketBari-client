import { Outlet } from "react-router";
import VendorSidebar from "../../../components/VendorSidebar";


const VendorDashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-base-200">
            {/* Sidebar */}
            <VendorSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default VendorDashboardLayout;
