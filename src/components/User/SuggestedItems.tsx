import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@apollo/client/react";
import { GET_MENU_ITEMS } from "../../graphql/queries/menu.graphql.ts";
import { useCart } from "../../contexts/CartContext.tsx";

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
  const { addItemToCart } = useCart();

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Recommended for You</h2>
          <p className="text-gray-600">Handpicked items based on your preferences</p>
        </div>
        <button className="text-green-600 hover:text-green-700 font-medium text-sm md:text-base transition-colors duration-200">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableItems.map((item: MenuItem) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden"
          >
            {/* Food Image */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.isVegetarian 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {item.isVegetarian ? "🟢 Veg" : "🔴 Non-Veg"}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-900">
                  <FaStar className="text-yellow-400 mr-1" />
                  {(Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Name & Price */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{item.price}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description || "Delicious and freshly prepared"}
              </p>

              {/* Add to Cart Button */}
              <button 
                onClick={() => addItemToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <FaShoppingCart className="text-sm" />
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
