import { useEffect, useState } from "react";
import axiosPublic from "../utils/axiosPublic";
import { Link } from "react-router";

export default function AllTickets() {
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        axiosPublic.get("/tickets")
            .then(res => {

                const ticketData = res.data.data;
                setTickets(ticketData);
                console.log(ticketData)
            })


    }, []);

    // if (loading) {
    //     return <div className="text-center py-10">Loading tickets...</div>;
    // }

    // if (error) {
    //     return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    // }

    return (
        <div>
            {tickets.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {tickets.map(ticket => (
                        <div key={ticket._id} className="card bg-base-100 shadow">
                            <img src={ticket.image} className="h-40 w-full object-cover" />
                            <div className="card-body">
                                <h2 className="card-title">{ticket.title}</h2>
                                <p>Price: ${ticket.price}</p>
                                <Link to={`/ticket/${ticket._id}`} className="btn btn-primary btn-sm">
                                    See Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center py-10">No tickets available</p>
            )}
        </div>
    );
}