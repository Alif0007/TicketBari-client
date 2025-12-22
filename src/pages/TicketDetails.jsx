import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CalendarDays, Clock, MapPin, Ticket, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosPublic from '../utils/axiosPublic';
import { AuthContext } from '../authProvider/AuthProvider';

const TicketDetails = () => {
    const { user } = use(AuthContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState([])
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingQuantity, setBookingQuantity] = useState(1);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        axiosPublic.get(`/tickets/${id}`)
            .then(res => {

                const tick = res.data;
                setTicketData(tick);


            })


    }, [id]);

    const { perks } = ticketData
    const lengthArr = perks?.length || 0


    // Sample ticket data - replace with API call
    const sampleTicket = {
        _id: id,
        title: "Express Bus to Cox's Bazar",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        from: "Dhaka",
        to: "Cox's Bazar",
        transportType: "bus",
        price: 1200,
        ticketQuantity: 15,
        perks: ["AC", "WiFi", "Snacks", "USB Charging", "Reclining Seats"],
        departureDateTime: "2025-12-28T08:00:00",
        description: "Comfortable air-conditioned bus service with professional drivers. Journey includes rest stops and onboard entertainment.",
        amenities: ["Free WiFi", "Charging Ports", "Water Bottle", "Blanket", "Reading Light"],
        company: "Green Line Paribahan",
        duration: "10 hours",
        distance: "390 km",
        cancellationPolicy: "Free cancellation up to 24 hours before departure",
        luggageAllowance: "2 pieces (25kg total)"
    };



    // Calculate countdown
    useEffect(() => {
        if (!ticketData?.departureTime) return;

        const updateCountdown = () => {
            const departure = new Date(ticketData.departureTime);
            const now = new Date();
            const diff = departure - now;

            if (diff <= 0) {
                setCountdown('Departed');

                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [ticketData]);

    // Load ticket data
    useEffect(() => {
        // In real app, fetch from API
        setTicket(sampleTicket);
        setLoading(false);
    }, [id]);

    const isDeparturePassed = () => {
        if (!ticket?.departureDateTime) return true;
        return new Date(ticket.departureDateTime) <= new Date();
    };

    const isBookNowDisabled = () => {
        return isDeparturePassed() || ticket?.ticketQuantity === 0;
    };

    const handleBookNow = () => {
        if (isBookNowDisabled()) return;
        setShowBookingModal(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (bookingQuantity < 1 || bookingQuantity > ticket.ticketQuantity) {
            toast.error('Invalid booking quantity');
            return;
        }

        setIsBooking(true);
        try {
            // API call to create booking

            const bookingData = {
                ticketId: ticketData._id,
                ticketTitle: ticketData.title,
                from: ticketData.from,
                to: ticketData.to,
                departureTime: ticketData.departureTime,
                image: ticketData.image,
                vendorEmail: ticketData.vendorEmail,
                userEmail: user.email,
                quantity: bookingQuantity,
                totalPrice: ticketData.price * bookingQuantity
            };



            console.log(bookingData)
            await axiosPublic.post("/bookings", bookingData);
            toast.success("Booking requested succesfully");

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Booking request submitted successfully!');
            setShowBookingModal(false);
            setBookingQuantity(1);
            // navigate('/dashboard/my-bookings');
        } catch (error) {
            toast.error('Failed to submit booking');
            console.log(error)
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <AlertCircle className="w-16 h-16 text-error mb-4" />
                <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/all-tickets')}>
                    Browse Available Tickets
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 pt-20 pb-12">
            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal modal-open">
                        <div className="modal-box max-w-md">
                            <h3 className="font-bold text-lg mb-4">Book Tickets</h3>
                            <form onSubmit={handleBookingSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Available Tickets: {ticketData.ticketQuantity}</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={ticket.ticketQuantity}
                                        value={bookingQuantity}
                                        onChange={(e) => setBookingQuantity(parseInt(e.target.value) || 1)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">
                                            Total Price: ৳{ticket.price * bookingQuantity}
                                        </span>
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => {
                                            setShowBookingModal(false);
                                            setBookingQuantity(1);
                                        }}
                                        disabled={isBooking}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isBooking}
                                    >
                                        {isBooking ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            'Confirm Booking'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm breadcrumbs mb-6">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/all-tickets">All Tickets</a></li>
                        <li className="text-primary font-semibold">{ticketData.title}</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Ticket Image & Basic Info */}
                        <div className="card bg-base-100 shadow-xl mb-8">
                            <figure className="h-80">
                                <img
                                    src={ticketData.image}
                                    alt={ticketData.title}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex flex-wrap items-center justify-between mb-4">
                                    <div>
                                        <span className="badge badge-primary text-lg px-4 py-2">
                                            {ticketData.transportType}
                                        </span>
                                        <span className="ml-4 badge badge-outline text-lg px-4 py-2">
                                            ৳{ticketData.price} <span className="text-sm font-normal">per ticket</span>
                                        </span>
                                    </div>
                                    <div className={`text-lg font-bold ${ticketData.quantity > 5 ? 'text-success' : ticketData.ticketQuantity > 0 ? 'text-warning' : 'text-error'}`}>
                                        {ticketData.quantity} tickets left
                                    </div>
                                </div>

                                <h1 className="card-title text-3xl font-bold mb-4">{ticketData.title}</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 text-primary mr-3" />
                                            <div>
                                                <div className="font-semibold">Route</div>
                                                <div className="text-lg">{ticketData.from} → {ticketData.to}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarDays className="w-5 h-5 text-primary mr-3" />
                                            <div>
                                                <div className="font-semibold">Departure</div>
                                                <div className="text-lg">
                                                    {new Date(ticketData.departureTime).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 text-primary mr-3" />
                                            <div>
                                                <div className="font-semibold">Time & Duration</div>
                                                <div className="text-lg">
                                                    {new Date(ticketData.departureTime).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })} • {ticket.duration}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Ticket className="w-5 h-5 text-primary mr-3" />
                                            <div>
                                                <div className="font-semibold">Distance</div>
                                                <div className="text-lg">{ticket.distance}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Countdown Timer */}
                                <div className="mb-8">
                                    <div className="text-sm font-semibold mb-2">DEPARTURE IN</div>
                                    <div className="flex space-x-4">
                                        {countdown.split(' ').map((unit, index) => (
                                            <div key={index} className="text-center">
                                                <div className="stat-value text-3xl font-mono">
                                                    {unit.match(/\d+/)?.[0] || '0'}
                                                </div>
                                                <div className="stat-desc">
                                                    {unit.match(/[a-z]/i)?.[0] || 'd'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-3">Description</h3>
                                    <p className="text-base-content/80">{ticket.description}</p>
                                </div>

                                {/* Perks */}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-3">Included Perks</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {lengthArr > 0 ? (
                                            perks.map((perk, index) => (
                                                <div key={`perk-${index}`} className="badge badge-primary badge-lg gap-2 p-4">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    {perk}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full">
                                                <p className="text-base-content/70 italic">No perks listed for this ticket.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>



                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title">Luggage Policy</h3>
                                    <p>{ticket.luggageAllowance}</p>
                                </div>
                            </div>
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h3 className="card-title">Cancellation Policy</h3>
                                    <p>{ticket.cancellationPolicy}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl mb-6">Book Your Journey</h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between">
                                            <span className="text-base-content/70">Base Price</span>
                                            <span className="font-semibold">৳{ticket.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-base-content/70">Available Seats</span>
                                            <span className={`font-bold ${ticket.ticketQuantity > 5 ? 'text-success' : 'text-warning'}`}>
                                                {ticket.ticketQuantity}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-base-content/70">Transport Type</span>
                                            <span className="badge badge-primary">{ticket.transportType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-base-content/70">Operator</span>
                                            <span className="font-semibold">{ticket.company}</span>
                                        </div>
                                    </div>

                                    <div className="divider"></div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        <button
                                            onClick={handleBookNow}
                                            disabled={isBookNowDisabled()}
                                            className={`btn btn-primary btn-lg w-full ${isBookNowDisabled() ? 'btn-disabled' : ''}`}
                                        >
                                            {isDeparturePassed() ? (
                                                <>
                                                    <AlertCircle className="w-5 h-5 mr-2" />
                                                    Departure Time Passed
                                                </>
                                            ) : ticket.ticketQuantity === 0 ? (
                                                <>
                                                    <AlertCircle className="w-5 h-5 mr-2" />
                                                    Sold Out
                                                </>
                                            ) : (
                                                'Book Now'
                                            )}
                                        </button>

                                        {isDeparturePassed() && (
                                            <div className="alert alert-warning">
                                                <AlertCircle className="w-5 h-5" />
                                                <span>This departure has already left. Please check other available tickets.</span>
                                            </div>
                                        )}

                                        {ticket.ticketQuantity > 0 && ticket.ticketQuantity <= 5 && !isDeparturePassed() && (
                                            <div className="alert alert-info">
                                                <AlertCircle className="w-5 h-5" />
                                                <span>Only {ticket.ticketQuantity} tickets left at this price!</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Important Notes */}
                                    <div className="mt-8 p-4 bg-base-200 rounded-lg">
                                        <h4 className="font-bold mb-2">Important Notes:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Booking confirmation is subject to vendor approval</li>
                                            <li>• Payment must be completed after vendor acceptance</li>
                                            <li>• Ticket quantity cannot be changed after booking</li>
                                            <li>• Present booking ID and ID proof during boarding</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Support */}
                            <div className="card bg-base-100 shadow-xl mt-6">
                                <div className="card-body">
                                    <h3 className="card-title">Need Help?</h3>
                                    <p className="text-sm mb-4">Our support team is here to assist you</p>
                                    <button className="btn btn-outline btn-sm">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default TicketDetails;