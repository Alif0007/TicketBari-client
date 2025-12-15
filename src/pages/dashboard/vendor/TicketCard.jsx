import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
    return (
        <div className="card bg-base-100 shadow-lg">
            <img src={ticket.image} className="h-40 w-full object-cover" />
            <div className="p-4">
                <h3 className="font-bold">{ticket.title}</h3>
                <p>{ticket.from} → {ticket.to}</p>
                <p>Status: <span className="badge">{ticket.verificationStatus}</span></p>

                <div className="flex gap-2 mt-2">
                    <Link to={`/dashboard/vendor/update/${ticket._id}`} className="btn btn-sm btn-info">
                        Update
                    </Link>
                    <button className="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
