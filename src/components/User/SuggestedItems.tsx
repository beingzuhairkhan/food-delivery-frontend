import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@apollo/client/react";
import { GET_MENU_ITEMS } from "../../graphql/queries/menu.graphql.ts";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
}

interface MenuItemsData {
  menuItems: MenuItem[];
}

const SuggestedItems = () => {
  const { loading, error, data } = useQuery<MenuItemsData>(GET_MENU_ITEMS);

  if (loading) return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Suggested Items</h2>
      <div className="flex justify-center items-center h-32">
        <div className="text-lg text-gray-600">Loading suggested items...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Suggested Items</h2>
      <div className="flex justify-center items-center h-32">
        <div className="text-lg text-red-600">Error loading items: {error.message}</div>
      </div>
    </div>
  );

  // Filter only available items and limit to 6 for suggested items
  const availableItems = data?.menuItems?.filter((item: MenuItem) => item.isAvailable)?.slice(0, 6) || [];

  return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6"> Suggested Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableItems.map((item: MenuItem, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Food Image */}
            <img
              src={item.imageUrl}
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
                    item.isVegetarian ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isVegetarian ? "Veg" : "Non-Veg"}
                </span>

                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar className="mr-1" />
                  {(Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)}
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
