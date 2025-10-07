import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface LocalOrderItem { name: string; qty: number; total: number; }
interface LocalOrder {
  id: string;
  items: LocalOrderItem[];
  total: number;
  status: string;
  paymentMethod?: string;
  date: string; // ISO string
}

const MyOrders = () => {
  const [orders, setOrders] = useState<LocalOrder[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const parsed: LocalOrder[] = JSON.parse(stored);
        // sort by date desc
        parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(parsed);
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
      setOrders([]);
    }
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto ">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <Link to="/" className='mt-2 p-2 bg-black text-white rounded-lg'>Return Home</Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-6 p-6 border rounded-xl text-center text-gray-600">
          No orders yet. Place your first order!
        </div>
      ) : (
        <div className="space-y-4 mt-2">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{order.paymentMethod === 'wallet' ? 'Wallet Order' : 'Order'}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Preparing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Items: {order.items.map(i => `${i.name} x ${i.qty}`).join(', ')}
              </p>
              <p className="text-gray-600 text-sm">Total: ₹{order.total}</p>
              <p className="text-gray-500 text-xs mt-1">Date: {new Date(order.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
