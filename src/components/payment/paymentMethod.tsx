import React from "react";
import { FaMoneyBillWave, FaCreditCard, FaWallet } from "react-icons/fa";
import { useWallet } from "../../contexts/WalletContext";

type Method = 'cod' | 'upi' | 'wallet';

interface Props {
  selected: Method;
  onChange: (m: Method) => void;
}

const PaymentMethod: React.FC<Props> = ({ selected, onChange }) => {
  const { balance } = useWallet();

  return (
    <div className="w-full p-2 mt-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Method
      </h2>
      <div className="flex gap-4 flex-wrap">
        {/* Cash on Delivery */}
        <div
          className={`flex-1 min-w-[240px] flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
            selected === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
          onClick={() => onChange("cod")}
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
          className={`flex-1 min-w-[240px] flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
            selected === "upi"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => onChange("upi")}
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

        {/* Mock Wallet */}
        <div
          className={`flex-1 min-w-[240px] flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
            selected === "wallet"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300"
          }`}
          onClick={() => onChange("wallet")}
        >
          <FaWallet
            className={`text-2xl ${
              selected === "wallet" ? "text-purple-600" : "text-gray-500"
            }`}
          />
          <div>
            <p className="font-medium text-gray-800">Mock Wallet</p>
            <p className="text-sm text-gray-500">Balance: ₹{balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod
