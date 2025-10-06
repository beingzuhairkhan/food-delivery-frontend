import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailure: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [failureDetails, setFailureDetails] = useState<{
    orderId: string | null;
    errorMessage: string | null;
    reason: string | null;
  } | null>(null);

  useEffect(() => {
    // Get failure details from URL parameters
    const orderId = searchParams.get('order_id');
    const errorMessage = searchParams.get('error_message') || 'Payment was not completed';
    const reason = searchParams.get('reason') || 'Payment cancelled or failed';

    console.log('Payment Failure Page - URL Params:', {
      orderId,
      errorMessage,
      reason,
    });

    setFailureDetails({
      orderId,
      errorMessage,
      reason,
    });

    setLoading(false);
  }, [searchParams]);

  const handleRetryPayment = () => {
    // Navigate back to cart/checkout page
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Failure Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
          <p className="mt-2 text-sm text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        {/* Failure Details */}
        {failureDetails && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2">
              {failureDetails.orderId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium text-gray-900">{failureDetails.orderId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-red-600">Failed</span>
              </div>
              {failureDetails.reason && (
                <div className="mt-4">
                  <span className="text-gray-600">Reason:</span>
                  <p className="text-sm text-gray-800 mt-1">{failureDetails.reason}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRetryPayment}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
          >
            Retry Payment
          </button>
          <button
            onClick={handleContinueShopping}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
          >
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Don't worry, no charges were made to your account.
            <br />
            Please contact support if you continue to face issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
