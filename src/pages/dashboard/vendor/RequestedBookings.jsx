import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../authProvider/AuthProvider";
import Swal from "sweetalert2";


const RequestedBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    // Add null check for user
    useEffect(() => {
        // Only fetch tickets if user exists and has email
        if (!user || !user.email) {

            return;
        }

        console.log('Fetching tickets for:', user.email);

        axios
            .get(`https://ticketbari-server-fawn.vercel.app/vendor/bookings?vendorEmail=${user?.email}`)
            .then(res => {
                setBookings(res.data)
                console.log(res)
            })
            .catch(error => {
                console.error('Error fetching tickets:', error);
                setBookings([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);



    if (loading) {
        return <div className="text-center py-10">Loading tickets...</div>;
    }






    const updateStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`https://ticketbari-server-fawn.vercel.app/bookings/${id}`, { status })
                    .then(data => {

                        if (data.data.modifiedCount) {
                            Swal.fire({
                                title: status.toUpperCase(),
                                text: `Your ticket has been ${status}.`,
                                icon: "success"
                            });
                            // const remainingBooks = bookings.filter(book => book._id !== id)
                            // setBookings(remainingBooks)

                        }
                    })
            }
        });
    }






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
