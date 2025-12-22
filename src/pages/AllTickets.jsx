import { useState, useEffect } from "react";
import axiosPublic from "../utils/axiosPublic";
import { Link } from "react-router";

export default function AllTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simple states
    const [search, setSearch] = useState({ from: "", to: "" });
    const [transport, setTransport] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch tickets
    useEffect(() => {
        fetchTickets();
    }, [page, transport, sort]); // Re-fetch when these change

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search.from) params.append("from", search.from);
            if (search.to) params.append("to", search.to);
            if (transport) params.append("type", transport);
            if (sort) params.append("sort", sort);
            params.append("page", page);

            const res = await axiosPublic.get(`/tickets?${params}`);
            setTickets(res.data.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle search
    const handleSearch = () => {
        setPage(1); // Reset to page 1 when searching
        fetchTickets();
    };

    // Clear all filters
    const clearFilters = () => {
        setSearch({ from: "", to: "" });
        setTransport("");
        setSort("");
        setPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Tickets</h1>

            {/* Simple Search & Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* From */}
                    <div>
                        <label className="block text-sm mb-1">From</label>
                        <input
                            type="text"
                            placeholder="e.g., Dhaka"
                            className="w-full border p-2 rounded"
                            value={search.from}
                            onChange={(e) => setSearch({ ...search, from: e.target.value })}
                        />
                    </div>

                    {/* To */}
                    <div>
                        <label className="block text-sm mb-1">To</label>
                        <input
                            type="text"
                            placeholder="e.g., Cox's Bazar"
                            className="w-full border p-2 rounded"
                            value={search.to}
                            onChange={(e) => setSearch({ ...search, to: e.target.value })}
                        />
                    </div>

                    {/* Transport Type */}
                    <div>
                        <label className="block text-sm mb-1">Transport Type</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={transport}
                            onChange={(e) => setTransport(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Launch">Launch</option>
                            <option value="Plane">Plane</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div>
                        <label className="block text-sm mb-1">Sort By</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search Tickets
                    </button>
                    <button
                        onClick={clearFilters}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2">Loading tickets...</p>
                </div>
            )}

            {/* Tickets Grid */}
            {!loading && tickets.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-600">No tickets found. Try different search.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tickets.map(ticket => (
                            <div key={ticket._id} className="bg-white rounded-lg shadow border p-4">
                                <img src={ticket.image} alt={ticket.title} className="w-full h-48 object-cover rounded mb-4" />

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{ticket.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                        {ticket.transportType}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-2">
                                    {ticket.from} → {ticket.to}
                                </p>

                                <p className="text-2xl font-bold text-green-600 mb-4">
                                    ৳{ticket.price}
                                </p>

                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span>Available: {ticket.quantity}</span>
                                    <span>Departure: {new Date(ticket.departureTime).toLocaleDateString()}</span>
                                </div>

                                <Link to={`/ticket/${ticket._id}`}>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Simple Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}