import { useEffect, useState } from "react";
import axiosPublic from "../../../utils/axiosPublic";


const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axiosPublic.get("/admin/tickets").then(res => setTickets(res.data));
    }, []);

    const handleStatus = (id, verificationStatus) => {
        axiosPublic.patch(`/admin/tickets/${id}`, { verificationStatus }).then(() => {
            setTickets(prev =>
                prev.map(t => t._id === id ? { ...t, verificationStatus: verificationStatus } : t)
            );
        });
    };



    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.vendorName}</td>
                        <td>{ticket.verificationStatus}</td>
                        <td>
                            <button onClick={() => handleStatus(ticket._id, "approved")} className="btn btn-success btn-xs">Approve</button>
                            <button onClick={() => handleStatus(ticket._id, "rejected")} className="btn btn-error btn-xs ml-2">Reject</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ManageTickets;
