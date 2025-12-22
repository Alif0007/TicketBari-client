import React from "react";
import { FaBus, FaClock, FaHeadset } from "react-icons/fa";

const TrustedStats = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
                    <span className="text-green-500">10+ Million</span> Travellers Trusted

                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="text-center">
                        <div className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-xl bg-green-100 text-green-600 text-2xl">
                            <FaBus />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">
                            Largest Ticketing Platform
                        </h3>

                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-green-500 text-xl font-bold">250M+</p>
                                <p className="text-sm text-gray-600">tickets</p>
                            </div>
                            <div>
                                <p className="text-green-500 text-xl font-bold">10M+</p>
                                <p className="text-sm text-gray-600">happy users</p>
                            </div>
                            <div>
                                <p className="text-green-500 text-xl font-bold">3000+</p>
                                <p className="text-sm text-gray-600">routes</p>
                            </div>
                            <div>
                                <p className="text-green-500 text-xl font-bold">1000+</p>
                                <p className="text-sm text-gray-600">trusted partners</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="text-center">
                        <div className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-xl bg-green-100 text-green-600 text-2xl">
                            <FaClock />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">
                            Quick & Easy Booking
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Skip the queues with Ticketbari! Book bus tickets online with access
                            to 100+ operators nationwide. Easily browse routes.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="text-center">
                        <div className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-xl bg-green-100 text-green-600 text-2xl">
                            <FaHeadset />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">
                            Fast Customer Support
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Quick and responsive assistance to resolve your issues without
                            delay—because your time matters to us.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedStats;
