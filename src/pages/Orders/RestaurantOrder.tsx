import React, { useState } from 'react';

const RestaurantOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: 'Zuhair Khan',
      items: ['Paneer Butter Masala', 'Naan'],
      total: 400,
      status: 'Pending',
      date: '2025-10-05',
    },
    {
      id: 'ORD002',
      customer: 'Ayesha Sharma',
      items: ['Margherita Pizza', 'Coke'],
      total: 350,
      status: 'Pending',
      date: '2025-10-05',
    },
  ]);

  const handleStatusChange = (orderId:any, newStatus:any) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Function to get badge color based on status
  const getStatusClasses = (status:any) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Restaurant Orders</h1>
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{order.customer}</h2>
              <span className="text-gray-500 text-sm">{order.date}</span>
            </div>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Items:</span> {order.items.join(', ')}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Total:</span> ₹{order.total}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <label className="font-medium">Status:</label>
              <select
                className={`border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              {/* Status badge */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrder;
