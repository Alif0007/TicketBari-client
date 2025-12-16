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

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

        await axiosPublic.post("http://localhost:3000/tickets", ticketData);
        e.target.reset();
        toast.success("Ticket added successfully");

    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-100 p-6 shadow-xl max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>

            <input name="title" placeholder="Ticket Title" className="input input-bordered mb-2" onChange={handleChange} />
            <input name="from" placeholder="From" className="input input-bordered mb-2" onChange={handleChange} />
            <input name="to" placeholder="To" className="input input-bordered mb-2" onChange={handleChange} />

            <select name="transportType" className="select select-bordered mb-2" onChange={handleChange}>
                <option>Bus</option>
                <option>Train</option>
                <option>Plane</option>
                <option>Launch</option>
            </select>

            <input name="price" type="number" placeholder="Price" className="input input-bordered mb-2" onChange={handleChange} />
            <input name="quantity" type="number" placeholder="Quantity" className="input input-bordered mb-2" onChange={handleChange} />
            <input name="departureTime" type="datetime-local" className="input input-bordered mb-2" onChange={handleChange} />

            <button className="btn btn-primary mt-4">Add Ticket</button>
        </form>
    );
};

export default AddTicket;
