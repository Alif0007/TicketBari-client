import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../authProvider/AuthProvider";


const RequestedBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/bookings?vendorEmail=${user.email}`)
            .then(res => setBookings(res.data));
    }, [user.email]);

    const updateStatus = (id, status) => {
        axios.patch(`http://localhost:5000/bookings/${id}`, { status });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Ticket</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(b => (
                    <tr key={b._id}>
                        <td>{b.userEmail}</td>
                        <td>{b.ticketTitle}</td>
                        <td>{b.quantity}</td>
                        <td>${b.totalPrice}</td>
                        <td>
                            <button onClick={() => updateStatus(b._id, "accepted")} className="btn btn-xs btn-success mr-2">
                                Accept
                            </button>
                            <button onClick={() => updateStatus(b._id, "rejected")} className="btn btn-xs btn-error">
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RequestedBookings;
