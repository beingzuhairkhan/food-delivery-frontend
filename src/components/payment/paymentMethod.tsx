import React, { useState } from "react";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

const PaymentMethod = () => {
  const [selected, setSelected] = useState("cod");

  return (
    <div className="w-full p-2 mt-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Method
      </h2>
      <div className="flex gap-4">
        {/* Cash on Delivery */}
        <div
          className={`flex-1 flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
            selected === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelected("cod")}
        >
          <FaMoneyBillWave
            className={`text-2xl ${
              selected === "cod" ? "text-green-600" : "text-gray-500"
            }`}
          />
          <div>
            <p className="font-medium text-gray-800">Cash On Delivery</p>
            <p className="text-sm text-gray-500">Pay when your food arrives</p>
          </div>
        </div>

        {/* UPI / Credit / Debit */}
        <div
          className={`flex-1 flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
            selected === "upi"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelected("upi")}
        >
          <FaCreditCard
            className={`text-2xl ${
              selected === "upi" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          <div>
            <p className="font-medium text-gray-800">
              UPI / Credit / Debit Card
            </p>
            <p className="text-sm text-gray-500">Pay securely online</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentMethod