import { useState, useEffect } from "react";
import axiosPublic from "../utils/axiosPublic";
import { Link } from "react-router";
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaArrowRight } from "react-icons/fa";
import { IoBusOutline, IoTrainOutline, IoBoatOutline, IoAirplaneOutline } from "react-icons/io5";

export default function AllTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        transport: "",
        sort: "",
        page: 1
    });
    const [totalPages, setTotalPages] = useState(1);

    // Fetch tickets
    useEffect(() => {
        fetchTickets();
    }, [filters.page, filters.transport, filters.sort]);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.from) params.append("from", filters.from);
            if (filters.to) params.append("to", filters.to);
            if (filters.transport) params.append("type", filters.transport);
            if (filters.sort) params.append("sort", filters.sort);
            params.append("page", filters.page);

            const res = await axiosPublic.get(`/tickets?${params}`);
            setTickets(res.data.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setFilters(prev => ({ ...prev, page: 1 }));
        fetchTickets();
        setFiltersOpen(false); // Close filters on mobile after search
    };

    const clearFilters = () => {
        setFilters({
            from: "",
            to: "",
            transport: "",
            sort: "",
            page: 1
        });
    };

    const hasActiveFilters = filters.from || filters.to || filters.transport || filters.sort;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Explore Tickets</h1>
                <p className="text-gray-600 text-center">Find your perfect journey</p>
            </div>

            {/* Filter Bar - Desktop */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border p-6 mb-8">
                <div className="flex items-center gap-6">
                    {/* From-To Search */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-1">
                        <div className="flex items-center">
                            <div className="flex-1 px-4 py-3">
                                <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                                <input
                                    type="text"
                                    placeholder="Departure city"
                                    className="w-full bg-transparent border-none outline-none text-gray-900"
                                    value={filters.from}
                                    onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                                />
                            </div>

                            <div className="text-gray-400 mx-2">
                                <FaArrowRight />
                            </div>

                            <div className="flex-1 px-4 py-3">
                                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                                <input
                                    type="text"
                                    placeholder="Destination city"
                                    className="w-full bg-transparent border-none outline-none text-gray-900"
                                    value={filters.to}
                                    onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Transport Type Selector */}
                    <div className="w-64">
                        <label className="block text-xs font-medium text-gray-500 mb-2">Transport Type</label>
                        <div className="flex gap-2">
                            {[
                                { value: "", label: "All", icon: <FaFilter /> },
                                { value: "Bus", label: "Bus", icon: <IoBusOutline /> },
                                { value: "Train", label: "Train", icon: <IoTrainOutline /> },
                                { value: "Launch", label: "Launch", icon: <IoBoatOutline /> },
                                { value: "Plane", label: "Plane", icon: <IoAirplaneOutline /> }
                            ].map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setFilters({ ...filters, transport: type.value })}
                                    className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg transition-all ${filters.transport === type.value
                                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
                                        }`}
                                >
                                    <span className="text-lg mb-1">{type.icon}</span>
                                    <span className="text-xs font-medium">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="w-48 ml-10">
                        <label className="block text-xs font-medium text-gray-500 mb-2">Sort By</label>
                        <div className="relative">
                            <select
                                className="w-full appearance-none bg-gray-50 border-none rounded-xl py-3 px-4 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            >
                                <option value="">Default</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                            <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleSearch}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                            <FaSearch />
                            Search
                        </button>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                                <FaTimes />
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
                <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="w-full flex items-center justify-between bg-white border rounded-xl p-4"
                >
                    <span className="font-medium">Filters & Search</span>
                    <FaFilter className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mobile Filter Panel */}
                {filtersOpen && (
                    <div className="bg-white border rounded-xl p-4 mt-2 space-y-4">
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                <input
                                    type="text"
                                    placeholder="Departure city"
                                    className="w-full border rounded-lg px-4 py-2"
                                    value={filters.from}
                                    onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                <input
                                    type="text"
                                    placeholder="Destination city"
                                    className="w-full border rounded-lg px-4 py-2"
                                    value={filters.to}
                                    onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</label>
                            <div className="grid grid-cols-4 gap-2">
                                {["", "Bus", "Train", "Launch", "Plane"].map((type) => (
                                    <button
                                        key={type || "all"}
                                        onClick={() => setFilters({ ...filters, transport: type })}
                                        className={`py-2 rounded-lg ${filters.transport === type
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {type || "All"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                className="w-full border rounded-lg px-4 py-2"
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            >
                                <option value="">Default</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleSearch}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium"
                            >
                                Apply Filters
                            </button>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 border rounded-lg text-gray-600"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.from && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                            From: {filters.from}
                            <button onClick={() => setFilters({ ...filters, from: "" })}>
                                <FaTimes className="text-xs" />
                            </button>
                        </span>
                    )}
                    {filters.to && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                            To: {filters.to}
                            <button onClick={() => setFilters({ ...filters, to: "" })}>
                                <FaTimes className="text-xs" />
                            </button>
                        </span>
                    )}
                    {filters.transport && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                            {filters.transport}
                            <button onClick={() => setFilters({ ...filters, transport: "" })}>
                                <FaTimes className="text-xs" />
                            </button>
                        </span>
                    )}
                    {filters.sort && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                            Sorted
                            <button onClick={() => setFilters({ ...filters, sort: "" })}>
                                <FaTimes className="text-xs" />
                            </button>
                        </span>
                    )}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Finding the best tickets for you...</p>
                </div>
            )}

            {/* Tickets Grid */}
            {!loading && tickets.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border">
                    <div className="text-6xl mb-4">🎫</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No tickets found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                    <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <>
                    {/* Results Count */}
                    {!loading && (
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold">{tickets.length}</span> tickets
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tickets.map(ticket => (
                            <div key={ticket._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                            {ticket.transportType}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                                        {ticket.title}
                                    </h3>

                                    <div className="flex items-center text-gray-600 mb-3">
                                        <span className="font-medium">{ticket.from}</span>
                                        <span className="mx-2">→</span>
                                        <span className="font-medium">{ticket.to}</span>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">
                                                ৳{ticket.price}
                                            </div>
                                            <div className="text-sm text-gray-500">per person</div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm ${ticket.quantity > 5
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {ticket.quantity} seats
                                        </div>
                                    </div>

                                    <Link to={`/ticket/${ticket._id}`}>
                                        <button className="cursor-pointer w-full bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 font-medium py-3 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Minimal Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-10">
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                                disabled={filters.page === 1}
                                className="px-5 py-2.5 border rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setFilters(prev => ({ ...prev, page: idx + 1 }))}
                                        className={`w-10 h-10 rounded-lg ${filters.page === idx + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                                disabled={filters.page === totalPages}
                                className="px-5 py-2.5 border rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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