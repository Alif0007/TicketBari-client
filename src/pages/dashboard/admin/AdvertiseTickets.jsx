import { useEffect, useState } from "react";
import axiosPublic from "../../../utils/axiosPublic";
import toast from "react-hot-toast";

const AdvertiseTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axiosPublic.get("/admin/tickets").then(res =>
            setTickets(res.data.filter(t => {
                return t.verificationStatus === "approved";

            }))
        );
    }, []);
    console.log(tickets)

    const advertise = id => {
        axiosPublic.patch(`/admin/tickets/advertise/${id}`, { advertised: true });
        toast.success("Added")
        console.log('click')

    };



    return (
        <div className="grid grid-cols-3 gap-4">
            {tickets.map(ticket => (
                <div key={ticket._id} className="card bg-base-100 shadow">
                    <img src={ticket.image} />
                    <div className="card-body">
                        <h2>{ticket.title}</h2>
                        <button onClick={() => advertise(ticket._id)} disabled={ticket.advertised} className="btn btn-primary">
                            {ticket.advertised ? "Added" : "Advertise"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvertiseTickets