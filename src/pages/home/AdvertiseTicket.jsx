import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosPublic from '../../utils/axiosPublic';

const AdvertiseTicketCard = () => {

    const [advertiseTickets, setAdvertiseTickets] = useState([])



    useEffect(() => {
        axiosPublic.get("/advertise-tickets")
            .then(res => {

                const ticketData = res.data.data;
                setAdvertiseTickets(ticketData);

            })

    }, []);
    console.log(advertiseTickets)




    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
            {advertiseTickets.map(ticket => (
                <div key={ticket._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                        <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {ticket.transportType}
                            </span>
                        </div>
                    </div>

                    <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                            {ticket.title}
                        </h3>

                        <div className="flex items-center text-gray-600 mb-3">
                            <span className="font-medium">{ticket.from}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{ticket.to}</span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    ৳{ticket.price}
                                </div>
                                <div className="text-sm text-gray-500">per person</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm ${ticket.quantity > 5
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {ticket.quantity} seats
                            </div>
                        </div>

                        <Link to={`/ticket/${ticket._id}`}>
                            <button className="cursor-pointer w-full bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 font-medium py-3 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvertiseTicketCard;