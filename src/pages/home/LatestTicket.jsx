import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosPublic from '../../utils/axiosPublic';

const LatestTicketCard = () => {
    const [latestTickets, setLatestTickets] = useState([])




    useEffect(() => {
        axiosPublic.get("/latest-tickets")
            .then(res => {

                const ticketData = res.data.data;
                setLatestTickets(ticketData);

            })

    }, []);
    console.log(latestTickets)




    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto'>
            {
                latestTickets.map(ticket => <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20">


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
                                {ticket.title}
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
                                <span className="text-3xl font-bold text-primary">৳{ticket.price}</span>
                                <span className="text-sm text-gray-500 ml-2">per person</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">All taxes included</div>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center justify-between mb-5">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium `}>
                                {ticket.quantity > 0 ? (
                                    <>
                                        <span className="inline-block w-2 h-2 rounded-full animate-pulse mr-2"></span>
                                        {ticket.quantity} seats available
                                    </>
                                ) : 'Sold Out'}
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">{ticket.transportType}</span>
                            </div>
                        </div>

                        {/* Perks */}
                        {ticket.perks && ticket.perks.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Perks included:</p>
                                <div className="flex flex-wrap gap-1">
                                    {ticket.perks.map((perk, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-outline badge-sm"
                                        >
                                            {perk}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* See Details Button */}
                        <Link
                            to={`/ticket/${ticket._id}`}
                            className="block w-full"
                        >
                            <button className="cursor-pointer w-full bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-95 flex items-center justify-center group/btn">
                                <span>See Details</span>
                                <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl pointer-events-none transition-colors duration-300"></div>
                </div>)
            }
        </div>
    );
};

export default LatestTicketCard;