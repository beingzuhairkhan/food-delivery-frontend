import { useEffect, useState } from 'react';

// TypeScript declaration for Cashfree SDK
declare global {
  interface Window {
    Cashfree: (config: { mode: 'sandbox' | 'production' }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: '_self' | '_blank';
      }) => Promise<{ error?: unknown; redirect?: boolean }>;
    };
  }
}

interface CartItem {
  foodName: string;
  count: number;
  totalPrice: number;
  userId: string;
  foodId: string;
}

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWallet } from '../../contexts/WalletContext';

type Method = 'cod' | 'upi' | 'wallet';

export const OrderSummary = ({ selectedMethod }: { selectedMethod: Method }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { balance, canAfford, spend } = useWallet();


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const sgst = +(subtotal * 0.025).toFixed(2);
  const cgst = +(subtotal * 0.025).toFixed(2);
  const total = +(subtotal + sgst + cgst).toFixed(2);

  // 🔹 Wallet-based order placement (mock, frontend-only)
  const handleWalletOrder = async () => {
    if (cartItems.length === 0) return alert('Your cart is empty!');
    const grandTotal = total;

    if (!canAfford(grandTotal)) {
      alert(`Insufficient wallet balance (₹${balance.toFixed(2)}). Please top up in Wallet.`);
      return;
    }

    try {
      setLoading(true);
      // Deduct from wallet
      const ok = spend(grandTotal);
      if (!ok) {
        alert('Could not deduct from wallet.');
        return;
      }

      // Persist order locally
      const existing = localStorage.getItem('orders');
      const orders = existing ? JSON.parse(existing) : [];
      const orderId = `WALLET-${Date.now()}`;
      const orderRecord = {
        id: orderId,
        items: cartItems.map((i) => ({ name: i.name, qty: i.quantity, total: +(i.price * i.quantity).toFixed(2) })),
        total: grandTotal,
        status: 'Paid',
        paymentMethod: 'wallet',
        date: new Date().toISOString(),
      };
      orders.push(orderRecord);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem('cartData');
      clearCart();

      // Navigate to My Orders page (mock wallet flow)
      navigate('/myorders');
    } catch (e) {
      console.error('Wallet order error:', e);
      alert('Something went wrong placing the order.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Payment & Order API call (backend flow) — retained for non-wallet methods
  const handlePayment = async () => {
    if (cartItems.length === 0) return alert('Your cart is empty!');
    console.log('Initiating payment for cart items:', cartItems);

    try {
      setLoading(true);
      if (selectedMethod === 'wallet') {
        await handleWalletOrder();
        return;
      }

      // Prepare payload for backend - send all cart items
      const payload = {
        items: cartItems.map((item) => ({
          foodId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: +(item.price * item.quantity).toFixed(2),
        })),
        totalAmount: total,
      };
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3000/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },

        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Payment Response:', data);

      if (res.ok && data.paymentSessionId) {
        console.log('Payment session created, redirecting to payment...');
        console.log('Payment Session ID:', data.paymentSessionId);
        console.log('Redirect URL:', data.redirectUrl);

        // Clear cart before payment
        localStorage.removeItem('cartData');

        // Simple redirect approach
        if (data.redirectUrl) {
          console.log('Redirecting to Cashfree payment page...');
          window.location.href = data.redirectUrl;
        } else {
          // Fallback: Try to use Cashfree SDK
          if (window.Cashfree) {
            try {
              const cashfree = window.Cashfree({
                mode: 'sandbox',
              });

              const checkoutOptions = {
                paymentSessionId: data.paymentSessionId,
                redirectTarget: '_self' as const,
              };

              console.log('Using Cashfree SDK as fallback...');
              const result = await cashfree.checkout(checkoutOptions);

              if (result.error) {
                console.error('Payment failed:', result.error);
                alert('Payment failed. Please try again.');
              }
            } catch (paymentError) {
              console.error('Cashfree SDK error:', paymentError);
              alert('Payment initialization failed. Please try again.');
            }
          } else {
            console.error('No redirect URL and Cashfree SDK not loaded');
            alert('Payment system not ready. Please try again.');
          }
        }
      } else {
        console.error('Payment session creation failed:', data);
        alert('Failed to create payment session. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

      {cartItems.length > 0 ? (
        <div className="space-y-2 text-gray-700">
          {cartItems.map((item, index) => (
            <p key={index} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </p>
          ))}

          <hr />
          <p className="flex justify-between font-medium">
            <span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>SGST (2.5%)</span> <span>₹{sgst.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>CGST (2.5%)</span> <span>₹{cgst.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery Fee</span> <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between font-bold text-lg text-red-600">
            <span>Total</span> <span>₹{total.toFixed(2)}</span>
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
        {loading
          ? 'Processing...'
          : selectedMethod === 'wallet'
          ? 'Pay with Wallet & Place Order'
          : 'Pay & Place Order'}
      </button>
    </div>
  );
};

export default OrderSummary;
