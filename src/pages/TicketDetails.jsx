import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosPublic from "../utils/axiosPublic";

export default function TicketDetails() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        axiosPublic.get(`/tickets/${id}`).then(res => setTicket(res.data));
    }, [id]);

    if (!ticket) return null;

    return (
        <div className="max-w-3xl mx-auto">
            <img src={ticket.image} className="rounded-lg" />
            <h1 className="text-3xl font-bold mt-4">{ticket.title}</h1>
            <p>{ticket.from} → {ticket.to}</p>
            <p className="mt-2">Price: ${ticket.price}</p>
            <button className="btn btn-success mt-4">Book Now</button>
        </div>
    );
}
