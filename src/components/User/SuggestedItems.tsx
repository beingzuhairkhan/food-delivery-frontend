import React from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const items = [
  {
    name: "Corn Pizza",
    price: 199,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Veg",
    rating: 4.5,
  },
  {
    name: "Chicken Burger",
    price: 99,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Non-Veg",
    rating: 4,
  },
  {
    name: "Burger",
    price: 99,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Veg",
    rating: 4.2,
  },
  {
    name: "Samosa (2 pieces)",
    price: 49,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Veg",
    rating: 4.8,
  },
  {
    name: "Paneer Roll",
    price: 129,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Veg",
    rating: 4.6,
  },
  {
    name: "Chicken Tandoori",
    price: 249,
    image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    veg: "Non-Veg",
    rating: 4.3,
  },
];

const SuggestedItems = () => {
  return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6"> Suggested Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Food Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-t-2xl"
            />

            {/* Content */}
            <div className="p-4">
              {/* Name & Price */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-gray-800">
                  {item.name}
                </h3>
                <span className="text-sm font-bold text-green-600">
                  ₹{item.price}
                </span>
              </div>

              {/* Veg/Non-Veg & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-sm font-medium ${
                    item.veg === "Veg" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.veg}
                </span>

                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar className="mr-1" />
                  {item.rating}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedItems;
