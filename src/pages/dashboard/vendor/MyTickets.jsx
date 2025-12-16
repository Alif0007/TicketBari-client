import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../authProvider/AuthProvider";
import TicketCard from "./TicketCard";

const MyTickets = () => {
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
            .get(`http://localhost:3000/vendor-tickets?vendorEmail=${user.email}`)
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



    if (loading) {
        return <div className="text-center py-10">Loading tickets...</div>;
    }



    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                My Tickets ({tickets.length})
            </h1>

            {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tickets.map(ticket => (
                        <TicketCard setTickets={setTickets} tickets={tickets} key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No tickets found for {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default MyTickets;