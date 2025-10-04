import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.tsx";

const Cart = () => {
    const { cartItems, updateQuantity, removeItemFromCart, getCartTotal, clearCart } = useCart();

    const handleQuantityChange = (id: string, delta: number) => {
        const currentItem = cartItems.find(item => item.id === id);
        if (currentItem) {
            const newQuantity = Math.max(1, currentItem.quantity + delta);
            updateQuantity(id, newQuantity);
        }
    };

    const handleRemove = (id: string) => {
        removeItemFromCart(id);
    };

    const totalAmount = getCartTotal();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link 
                                to="/" 
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Menu
                            </Link>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Cart</h1>
                        <div className="w-24"></div> {/* Spacer for balance */}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Empty Cart State */}
                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h3>
                            <p className="text-gray-600 mb-8">Looks like you haven't added any delicious items to your cart yet.</p>
                            <Link 
                                to="/" 
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Browse Menu
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Order Items ({cartItems.length})
                                </h2>
                                
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                                        >
                                            {/* Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.imageUrl || "https://via.placeholder.com/150"}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm text-gray-600">₹{item.price}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                        item.isVegetarian 
                                                            ? "bg-green-100 text-green-700" 
                                                            : "bg-red-100 text-red-700"
                                                    }`}>
                                                        {item.isVegetarian ? "Veg" : "Non-Veg"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-l-lg transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 py-2 font-medium text-gray-900 bg-gray-50">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-r-lg transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-900">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                        <span>₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Taxes & Fees</span>
                                        <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{(totalAmount * 1.05).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link 
                                        to="/checkout" 
                                        className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </Link>
                                    
                                    <button 
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to clear your cart?')) {
                                                clearCart();
                                            }
                                        }}
                                        className="w-full bg-white text-red-600 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors border border-red-200"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                {/* Delivery Info */}
                                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Free Delivery
                                    </div>
                                    <p className="text-sm text-green-600">
                                        Your order qualifies for free delivery! Estimated time: 25-30 minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
