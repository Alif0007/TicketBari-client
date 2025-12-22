import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white text-center px-6">

            {/* Illustration / Optional Image */}
            <img
                className="w-64 drop-shadow-lg rounded-xl"
                src="https://img.freepik.com/free-vector/business-brochure-template_23-2147799301.jpg?semt=ais_hybrid&w=740&q=80"
                alt="WarmPaws Error"
            />

            <h1 className="text-6xl font-extrabold text-blue-600 mt-6">
                404
            </h1>

            <h2 className="text-2xl font-bold text-gray-700 mt-2">
                Oops! Page not found 🐾
            </h2>

            <p className="text-gray-600 mt-3 max-w-md">
                Looks like this page took a winter nap! Let’s get you back somewhere warm.
            </p>

            <Link to="/">
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
                    Go Back Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;