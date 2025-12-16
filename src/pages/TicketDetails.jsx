
import { use, useEffect, useState } from "react";
import axiosPublic from "../utils/axiosPublic";
import { useParams } from "react-router";
import { AuthContext } from "../authProvider/AuthProvider";
import toast from "react-hot-toast";

const TicketDetails = () => {
    const { user } = use(AuthContext)
    console.log(user)
    const [ticket, setTicket] = useState([]);
    const [qty, setQty] = useState(1);

    const id = useParams().id
    console.log(id)

    useEffect(() => {
        axiosPublic.get(`/tickets/${id}`)
            .then(res => {

                const ticketData = res.data;
                setTicket(ticketData);
                console.log(ticketData)
            })


    }, [id]);

    const handleBookNow = async () => {
        const bookingData = {
            ticketId: ticket._id,
            ticketTitle: ticket.title,
            vendorEmail: ticket.vendorEmail,
            userEmail: user.email,
            quantity: qty,
            totalPrice: ticket.price * qty
        };

        await axiosPublic.post("/bookings", bookingData);
        toast.success("Booking requested succesfully");
    };


    return (
        <div>
            <h2>{ticket?.title}</h2>
            <h2>{ticket?.quantity}</h2>

            <input
                type="number"
                min="1"
                max={ticket?.quantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input input-bordered"
            />

            <button
                className="btn btn-primary mt-2"
                onClick={handleBookNow}
            >
                Book Now
            </button>
        </div>
    );
};

export default TicketDetails;
