import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../authProvider/AuthProvider";
import axiosPublic from "../../../utils/axiosPublic";

const AddTicket = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: "",
        from: "",
        to: "",
        transportType: "",
        price: "",
        quantity: "",
        departureTime: "",
        perks: [],
        image: ""
    });

    // Available perks
    const availablePerks = [
        { id: "ac", label: "AC" },
        { id: "food", label: "Food" },
        { id: "wifi", label: "WiFi" },
        { id: "medicine", label: `Basic Medicine ` },
        { id: "tv", label: "TV" },
        { id: "charging", label: "Charging Port" },
        { id: "blanket", label: "Blanket" },
        { id: "water", label: "Mineral Water" }
    ];

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handlePerkChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            // Add perk to array
            setFormData({
                ...formData,
                perks: [...formData.perks, value]
            });
        } else {
            // Remove perk from array
            setFormData({
                ...formData,
                perks: formData.perks.filter(perk => perk !== value)
            });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const ticketData = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            vendorName: user.displayName,
            vendorEmail: user.email,
            verificationStatus: "pending"
        };

        try {
            await axiosPublic.post("https://ticketbari-server-fawn.vercel.app/tickets", ticketData);
            e.target.reset();

            // Reset perks array after submission
            setFormData(prev => ({ ...prev, perks: [] }));

            toast.success("Ticket added successfully");
        } catch (error) {
            console.error("Error adding ticket:", error);
            toast.error("Failed to add ticket");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-100 p-6 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Ticket</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Ticket Title *</span>
                        </label>
                        <input
                            name="title"
                            placeholder="e.g., Dhaka to Cox's Bazar"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">From *</span>
                        </label>
                        <input
                            name="from"
                            placeholder="Departure location"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">To *</span>
                        </label>
                        <input
                            name="to"
                            placeholder="Destination"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Transport Type *</span>
                        </label>
                        <select
                            name="transportType"
                            className="select select-bordered w-full"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Transport</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Plane">Plane</option>
                            <option value="Launch">Launch</option>
                        </select>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Price (৳) *</span>
                        </label>
                        <input
                            name="price"
                            type="number"
                            placeholder="e.g., 1500"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Available Seats *</span>
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            placeholder="Number of seats"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Departure Time *</span>
                        </label>
                        <input
                            name="departureTime"
                            type="datetime-local"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Perks Section */}
            <div className="mt-6">
                <label className="label">
                    <span className="label-text font-semibold">Available Perks (Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {availablePerks.map(perk => (
                        <div key={perk.id} className="form-control">
                            <label className="label cursor-pointer justify-start gap-2 wrap-anywhere">
                                <input
                                    type="checkbox"
                                    value={perk.id}
                                    checked={formData.perks.includes(perk.id)}
                                    onChange={handlePerkChange}
                                    className="checkbox checkbox-primary checkbox-sm"
                                />
                                <span className="label-text">{perk.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    Selected perks: {formData.perks.length > 0 ? formData.perks.map(p => availablePerks.find(ap => ap.id === p)?.label).join(", ") : "None"}
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                <button type="submit" className="btn btn-primary w-full">
                    Add Ticket
                </button>
            </div>
        </form>
    );
};

export default AddTicket;