import { FaTrash } from "react-icons/fa";
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
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Cart</h2>
            
            {/* Empty Cart State */}
            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
                    <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition duration-300">
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center justify-between border rounded-2xl p-4 mb-6 bg-white shadow hover:shadow-lg transition"
                        >
                            {/* Image and Name */}
                            <div className="flex items-center gap-4 w-full md:w-1/2">
                                <img
                                    src={item.imageUrl || "https://via.placeholder.com/150"}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-2xl"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-500">₹{item.price} each</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            item.isVegetarian ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                        }`}>
                                            {item.isVegetarian ? "Veg" : "Non-Veg"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                                <div className="flex items-center border rounded-lg px-3 py-1 bg-gray-50">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="text-red-500 font-bold text-lg hover:text-red-700"
                                    >
                                        –
                                    </button>
                                    <span className="px-3 font-medium text-gray-700">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="text-green-500 font-bold text-lg hover:text-green-700"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-500 hover:text-red-700 transition text-xl"
                                >
                                    <FaTrash />
                                </button>

                                <div className="font-bold text-gray-800 text-lg">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Cart Summary */}
                    <div className="flex items-center justify-between p-6 mt-8 bg-green-100 rounded-2xl font-bold text-gray-800 shadow-md">
                        <span className="text-xl">Total Amount ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="text-xl text-green-700">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear your cart?')) {
                                    clearCart();
                                }
                            }}
                            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition duration-300"
                        >
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg flex items-center justify-center gap-2">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
