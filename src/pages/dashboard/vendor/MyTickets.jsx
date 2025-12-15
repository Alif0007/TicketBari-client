import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../../authProvider/AuthProvider";
import TicketCard from "./TicketCard";

const MyTickets = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/tickets?vendorEmail=${user.email}`)
            .then(res => setTickets(res.data));
    }, [user.email]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tickets.map(ticket => (
                <TicketCard key={ticket._id} ticket={ticket} />
            ))}
        </div>
    );
};

export default MyTickets;
