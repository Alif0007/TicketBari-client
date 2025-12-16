import { Outlet } from "react-router";
import VendorSidebar from "../../../components/VendorSidebar";
import { Toaster } from "react-hot-toast";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";


const VendorDashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen flex bg-base-200">

                {/* Sidebar */}
                <VendorSidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Outlet />
                </div>



                <div>
                    <Toaster></Toaster>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default VendorDashboardLayout;
