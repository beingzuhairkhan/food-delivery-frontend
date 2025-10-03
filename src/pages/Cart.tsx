import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const initialCartItems = [
    {
        id: 1,
        name: "Chicken Burger",
        price: 199,
        image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        quantity: 2,
    },
    {
        id: 2,
        name: "Pizza",
        price: 199,
        image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        quantity: 2,
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (id: any, delta: any) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleRemove = (id: any) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Cart</h2>

            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between border rounded-2xl p-4 mb-6 bg-white shadow hover:shadow-lg transition"
                >
                    {/* Image and Name */}
                    <div className="flex items-center gap-4 w-full md:w-1/2">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-2xl"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.name}
                            </h3>
                            <p className="text-gray-500">₹{item.price} each</p>
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
                            ₹{item.price * item.quantity}
                        </div>
                    </div>
                </div>
            ))}

            {/* Total Amount */}
            <div className="flex items-center justify-between p-6 mt-8 bg-green-100 rounded-2xl font-bold text-gray-800 shadow-md">
                <span className="text-xl">Total Amount</span>
                <span className="text-xl text-green-700">₹{totalAmount}</span>
            </div>
            <Link to="/checkout" className="flex justify-end mt-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg flex items-center justify-center gap-2">
                    Proceed to Checkout
                </button>
            </Link>


        </div>
    );
};

export default Cart;
