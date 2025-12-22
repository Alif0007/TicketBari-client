import { NavLink, Outlet } from "react-router";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { CgProfile } from "react-icons/cg";
import { LuDollarSign, LuTicketPlus, LuTickets } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { DollarSignIcon } from "lucide-react";

const VendorDashboardLayout = () => {
    console.log('sss')
    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked={false} />
                <div className="drawer-content">
                    {/* Navbar */}

                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>


                    {/* Page content here */}
                    <div className="p-4"><Outlet /></div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li><NavLink to="vendor-profile"><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex justify-center items-center gap-2" data-tip=" Profile">

                                <span className="text-xl"><CgProfile /></span>
                                <span className="is-drawer-close:hidden">Vendor Profile</span>
                            </button></NavLink>
                            </li>

                            <li><NavLink to="add-ticket"><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex justify-center items-center gap-2" data-tip="Add Ticket">

                                <span className="text-xl"><LuTickets />
                                </span>
                                <span className="is-drawer-close:hidden">Add Ticket</span>
                            </button></NavLink>
                            </li>
                            <li><NavLink to="my-tickets"><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex justify-center items-center gap-2" data-tip="My Tickets">

                                <span className="text-xl"><MdManageAccounts />
                                </span>
                                <span className="is-drawer-close:hidden">My Tickets</span>
                            </button></NavLink>
                            </li>
                            <li><NavLink to="requested-bookings"><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex justify-center items-center gap-2" data-tip=" Requested Bookings">

                                <span className="text-xl"><LuTicketPlus />
                                </span>
                                <span className="is-drawer-close:hidden"> Requested Bookings</span>
                            </button></NavLink>
                            </li>
                            <li><NavLink to="revenue-overview"><button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex justify-center items-center gap-2" data-tip=" Revenue Overview">

                                <span className="text-xl"><LuDollarSign />
                                </span>
                                <span className="is-drawer-close:hidden"> Revenue Overview</span>
                            </button></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default VendorDashboardLayout;
