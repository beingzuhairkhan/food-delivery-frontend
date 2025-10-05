import { useEffect, useState } from "react";

interface CartItem {
  foodName: string;
  count: number;
  totalPrice: number;
  userId: string;
  foodId: string;
}

export const OrderSummary = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    console.log("d",storedCart)
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cartData:", error);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // 🔹 Payment & Order API call
const handlePayment = async () => {
  if (cartItems.length === 0) return alert("Your cart is empty!");

  try {
    setLoading(true);

    // Use the first item in cartItems (parsed array)
    const firstItem = cartItems[0];

    const payload = {
      count: firstItem.count,
      foodName: firstItem.foodName,
      foodId: firstItem.foodId, 
      totalPrice: subtotal,
      userId: firstItem.userId,
    };
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:3000/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token}` 
      },
      
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Payment Response:", data);

    if (res.ok && data.paymentSessionId) {
      alert("Payment session created successfully!");
        window.location.href = data.redirectUrl;

    } else {
      alert("Failed to create payment session.");
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>

      {cartItems.length > 0 ? (
        <div className="space-y-2 text-gray-700">
          {cartItems.map((item, index) => (
            <p key={index} className="flex justify-between">
              <span>
                {item.foodName} x {item.count}
              </span>
              <span>₹{item.totalPrice}</span>
            </p>
          ))}

          <hr />
          <p className="flex justify-between font-medium">
            <span>Subtotal</span> <span>₹{subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery Fee</span>{" "}
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between font-bold text-lg text-red-600">
            <span>Total</span> <span>₹{subtotal}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
