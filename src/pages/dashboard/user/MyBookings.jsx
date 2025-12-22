import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../authProvider/AuthProvider";
import TicketCard from "../vendor/TicketCard";


const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add null check for user
    useEffect(() => {
        // Only fetch tickets if user exists and has email
        if (!user || !user.email) {

            return;
        }

        console.log('Fetching tickets for:', user.email);

        axios
            .get(`https://ticketbari-server-fawn.vercel.app/bookings?userEmail=${user.email}`)
            .then(res => {
                setTickets(res.data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tickets:', error);
                setTickets([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    console.log(tickets)

    if (loading) {
        return <div className="text-center py-10">Loading tickets...</div>;
    }



    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                My Tickets ({tickets.length})
            </h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto'>
                {
                    tickets.map(ticket => <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20">


                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                            {/* Title and Route */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                                    {ticket.ticketTitle}
                                </h3>
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                    <span className="font-medium bg-blue-50 px-2 py-1 rounded mr-2">{ticket.from}</span>
                                    <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    <span className="font-medium bg-blue-50 px-2 py-1 rounded ml-2">{ticket.to}</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="mb-5">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-primary">৳{ticket.totalPrice}</span>

                                </div>
                                <div className="text-xs text-gray-500 mt-1">All taxes included</div>
                            </div>

                            {/* Availability */}
                            <div className="flex items-center justify-between mb-5">
                                <div className={` py-1 rounded-full text-sm font-medium `}>
                                    {ticket.quantity > 0 ? (
                                        <>
                                            <span className="inline-block w-2 h-2 rounded-full animate-pulse mr-2"></span>
                                            {ticket.quantity} seats
                                        </>
                                    ) : 'Sold Out'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">{ticket.transportType}</span>
                                </div>
                            </div>

                            <div>
                                {ticket.status}
                            </div>


                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors duration-300"></div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyBookings;