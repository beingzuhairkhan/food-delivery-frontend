import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Success Icon */}
      <FaCheckCircle className="text-green-500 text-6xl animate-bounce mb-4" />

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Order Placed Successfully 🎉
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your order! Your delicious food is being prepared and will
        be delivered soon.
      </p>

      {/* Order Summary Button */}
     <Link to="/myorders" >
     
      <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
        View Order Summary
      </button>
      </Link>
    </div>
  );
};

export default OrderPlaced;
