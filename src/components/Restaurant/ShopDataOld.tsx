import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiEdit, 
  FiTrash, 
  FiPlus, 
  FiSettings, 
  FiTrendingUp,
  FiUsers,
  FiShoppingBag,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail
} from "react-icons/fi";
import { getMyRestaurant } from "../../service/graphql";

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type?: string;
  inStock: boolean;
}

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  city?: string;
  state?: string;
  phone: string;
  email: string;
  cuisineType: string;
  averageRating: number;
  totalReviews: number;
  foodItems: FoodItem[];
}

const ShopData = () => {
  const [shopAvailable, setShopAvailable] = useState(false);
  const [shop, setShop] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      const restaurantData = await getMyRestaurant();
      if (restaurantData) {
        setShop(restaurantData);
        setShopAvailable(true);
      } else {
        setShopAvailable(false);
      }
    } catch (err: unknown) {
      console.error('Error fetching restaurant data:', err);
      // If error is "No restaurant found", it's expected behavior, not an error
      const errorMessage = err instanceof Error ? err.message : String(err);
      const isNoRestaurantError = errorMessage.includes('No restaurant found') || 
                                  errorMessage.includes('Failed to fetch restaurant: No restaurant found');
      
      if (isNoRestaurantError) {
        setShopAvailable(false);
        setError(null); // Don't show error, show the "Get Started" flow instead
        console.log('No restaurant found - showing setup flow');
      } else {
        setError(errorMessage || 'Failed to fetch restaurant data');
        setShopAvailable(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
        <div className="text-center">
          <GiKnifeFork className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your restaurant...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchRestaurantData}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {!shopAvailable ? (
        // If no shop available
        <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
          <div className="text-orange-500 mb-6">
            <GiKnifeFork className="w-20 h-20 mx-auto" />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Welcome to Your Restaurant Dashboard!
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
            You're just one step away from starting your food delivery business. 
            Set up your restaurant profile to begin managing your menu, orders, and more!
          </p>



          <Link to="/add-restaurant">
            <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition transform hover:scale-105">
              🍽️ Set Up My Restaurant
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

          {/* Restaurant Info Card */}
          <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img
                src={shop.image || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop&crop=center`}
                alt={shop.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=300&fit=crop&crop=center`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200">
                <FiEdit size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {shop.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="font-medium">{shop.city}, {shop.state}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                    {shop.address}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🟢 Active
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{shop.foodItems?.length || 0}</p>
                  <p className="text-sm text-gray-500">Menu Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">4.5</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">24/7</p>
                  <p className="text-sm text-gray-500">Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Items */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Your Menu</h3>
            <Link to="/add-food-item">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2">
                <span>+</span> Add New Item
              </button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {shop?.foodItems && shop.foodItems.length > 0 ? (
              shop.foodItems.map((item: FoodItem, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex">
                  {/* Food Item Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center`;
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'veg' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.type === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-gray-100">
                      <Link to={`/edit-food-item/${item._id || idx}`} className="flex-1">
                        <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-2">
                          <FiEdit size={16} />
                          Edit
                        </button>
                      </Link>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2">
                        <FiTrash size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-gray-400 mb-4">
                  <GiKnifeFork className="w-16 h-16 mx-auto opacity-50" />
                </div>
                <h4 className="text-xl font-semibold text-gray-600 mb-2">
                  Your menu is empty
                </h4>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start building your menu by adding delicious food items that your customers will love!
                </p>
                <Link to="/add-food-item">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold">
                    🍽️ Add Your First Menu Item
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopData;
