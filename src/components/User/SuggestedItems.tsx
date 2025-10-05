import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useQuery } from "@apollo/client/react";
import { GET_RECOMMENDED_ITEMS } from "../../graphql/queries/getRestaurant.queries.ts";
import { useCart } from "../../contexts/CartContext.tsx";

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  city?: string;
  state?: string;
  address: string;
}

interface RecommendedItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type?: string;
  restaurant: Restaurant;
}

interface RecommendedItemsData {
  recommendedItems: RecommendedItem[];
}

const SuggestedItems = () => {
  const { loading, error, data } = useQuery<RecommendedItemsData>(GET_RECOMMENDED_ITEMS);
  const { addItemToCart } = useCart();

  if (loading) return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="flex justify-center items-center h-32">
        <div className="text-lg text-gray-600">Loading recommended items...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="flex justify-center items-center h-32">
        <div className="text-lg text-red-600">Error loading items: {error.message}</div>
      </div>
    </div>
  );

  // Get recommended items (already limited to 2 per restaurant)
  const availableItems = data?.recommendedItems || [];

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
        {availableItems.map((item: RecommendedItem) => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden"
          >
            {/* Food Image */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'veg' 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {item.type === 'veg' ? "🟢 Veg" : "🔴 Non-Veg"}
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

              {/* Restaurant Info */}
              <div className="mb-3">
                <p className="text-sm text-gray-500">
                  From <span className="font-medium text-gray-700">{item.restaurant.name}</span>
                </p>
                <p className="text-xs text-gray-400">
                  {item.restaurant.city}, {item.restaurant.state}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => {
                  const menuItem = {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    imageUrl: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center',
                    isVegetarian: item.type === 'veg',
                    isAvailable: true
                  };
                  addItemToCart(menuItem);
                }}
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
