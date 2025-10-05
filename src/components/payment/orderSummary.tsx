import { Link } from "react-router-dom";

export const OrderSummary = () => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2 text-gray-700">
        <p className="flex justify-between">
          <span>Chicken Burger x 4</span> <span>₹796</span>
        </p>
        <p className="flex justify-between">
          <span>Pizza x 2</span> <span>₹398</span>
        </p>
        <hr />
        <p className="flex justify-between font-medium">
          <span>Subtotal</span> <span>₹1194</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Fee</span> <span className="text-green-600">Free</span>
        </p>
        <p className="flex justify-between font-bold text-lg text-red-600">
          <span>Total</span> <span>₹1194</span>
        </p>
      </div>

      <Link to="/orderSuccess" >
      <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition">
        Pay & Place Order
      </button>
      </Link>
    </div>
  );
};
export default OrderSummary