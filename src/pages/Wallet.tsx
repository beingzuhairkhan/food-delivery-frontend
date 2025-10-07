import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';

const Wallet: React.FC = () => {
  const { balance, addFunds } = useWallet();
  const [amount, setAmount] = useState<string>('');

  const handleTopUp = () => {
    const val = Number(amount);
    if (Number.isNaN(val) || val <= 0) {
      alert('Enter a valid amount');
      return;
    }
    addFunds(val);
    setAmount('');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-gray-100 mt-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Wallet</h2>
        <Link to="/checkout" className="text-sm text-red-600 hover:underline">Go to Checkout</Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow border">
        <p className="text-gray-600">Current Balance</p>
        <div className="text-3xl font-extrabold mt-1">₹{balance.toFixed(2)}</div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow border mt-4">
        <label className="block text-gray-700 font-medium mb-2">Add Funds</label>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleTopUp}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">This is a mock wallet for demo purposes. No real payments are processed.</p>
      </div>
    </div>
  );
};

export default Wallet;