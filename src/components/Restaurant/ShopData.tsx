import React, { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

const ShopData = () => {
  const [shopAvailable, setShopAvailable] = useState(true);

  // Example shop data (replace with API later)
  const shop = {
    name: "Krishna Bakery",
    image:
      "https://i.pinimg.com/originals/cc/a8/7d/cca87d064974d9230558a0eee0d02602.jpg",
    city: "Jhansi",
    state: "Uttar Pradesh",
    address: "Nandanpura Nagara Road, Railway Colony, Jhansi - 284003, UP, India",
    items: [
      {
        name: "Burger",
        category: "Burgers",
        type: "veg",
        price: 199,
        image:
          "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg",
      },
      
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {!shopAvailable ? (
        // If no shop available
        <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
          <div className="text-orange-500 mb-6">
            <GiKnifeFork className="w-20 h-20 mx-auto" />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            No Restaurant Found
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
            It looks like you haven't added your restaurant yet. Add your
            restaurant to start managing your menu, orders, and more!
          </p>

          <Link to="/add-restaurant">
            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition">
              Get Started
            </button>
          </Link>
        </div>
      ) : (
        // If shop available
        <div className="max-w-3xl mx-auto">
          {/* Welcome Title */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 flex items-center justify-center gap-2">
            <GiKnifeFork className="text-orange-500" />
            Welcome to {shop.name}
          </h2>

          {/* Shop Card */}
          <div className="relative bg-white shadow-md rounded-xl overflow-hidden mb-8 hover:shadow-lg transition">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-60 object-cover"
            />
            <button className="absolute top-3 right-3 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition">
              <FiEdit size={18} />
            </button>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {shop.name}
              </h3>
              <p className="text-sm text-gray-600">
                {shop.city}, {shop.state}
              </p>
              <p className="text-sm text-gray-500 mt-1">{shop.address}</p>
            </div>
          </div>

          {/* Food Items */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu</h3>
          <div className="space-y-4">
            {shop.items.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-center bg-white shadow rounded-xl p-4 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-orange-600">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Category: {item.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Food Type: {item.type}
                  </p>
                  <p className="text-md font-bold text-gray-800 mt-1">
                    ₹{item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="absolute bottom-3 right-3 flex gap-3 text-gray-500">
                 <Link to="/edit-food-item/:id" >
                  <button className="hover:text-orange-500 transition">
                    <FiEdit size={18} />
                  </button></Link>
                  <button className="hover:text-red-500 transition">
                    <FiTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopData;
