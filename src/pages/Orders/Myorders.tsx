import React from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  // Sample data - later you can fetch from backend
  const orders = [
    {
      id: 'ORD123',
      restaurant: 'Pizza Hut',
      items: ['Pepperoni Pizza', 'Coke'],
      total: 500,
      status: 'Delivered',
      date: '2025-10-01',
    },
    {
      id: 'ORD124',
      restaurant: 'Burger King',
      items: ['Whopper', 'Fries'],
      total: 350,
      status: 'Preparing',
      date: '2025-10-03',
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto ">
     <div className='flex justify-between' >
         <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <Link to="/" className='mt-2 p-2 bg-black text-white rounded-lg' >Return Home</Link>
     </div>
      <div className="space-y-4 mt-2">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{order.restaurant}</h2>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  order.status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'Preparing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Items: {order.items.join(', ')}
            </p>
            <p className="text-gray-600 text-sm">Total: ₹{order.total}</p>
            <p className="text-gray-500 text-xs mt-1">Date: {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
