import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiEdit, 
  FiTrash, 
  FiPlus, 
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
      setError(null);
      const restaurantData = await getMyRestaurant();
      if (restaurantData) {
        setShop(restaurantData);
        setShopAvailable(true);
      } else {
        setShopAvailable(false);
      }
    } catch (err: unknown) {
      console.error('Error fetching restaurant data:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      const isNoRestaurantError = errorMessage.includes('No restaurant found') || 
                                  errorMessage.includes('Failed to fetch restaurant: No restaurant found');
      
      if (isNoRestaurantError) {
        setShopAvailable(false);
        setError(null);
      } else {
        setError(`Failed to load restaurant data. ${errorMessage}`);
        setShopAvailable(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error loading data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchRestaurantData}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!shopAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <div className="text-gray-400 mb-6">
            <FiShoppingBag className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Restaurant Found</h2>
          <p className="text-gray-600 mb-6">
            Create your restaurant to start managing your menu.
          </p>
          <Link
            to="/add-restaurant"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors inline-block"
          >
            Create Restaurant
          </Link>
        </div>
      </div>
    );
  }

  if (!shop) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{shop.name}</h1>
              <p className="text-sm text-gray-500 mt-1">Restaurant Dashboard</p>
            </div>
            <Link
              to="/add-food-item"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Item
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiShoppingBag className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Items</p>
                <p className="text-2xl font-semibold text-gray-900">{shop.foodItems?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiStar className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-2xl font-semibold text-gray-900">{shop.averageRating?.toFixed(1) || '0.0'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{shop.totalReviews || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cuisine</p>
                <p className="text-lg font-semibold text-gray-900">{shop.cuisineType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Restaurant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <FiMapPin className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{shop.address}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FiPhone className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{shop.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FiMail className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{shop.email}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={shop.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&crop=center'}
                  alt={shop.name}
                  className="w-48 h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Menu Items</h3>
              <Link
                to="/add-food-item"
                className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
              >
                Add new item
              </Link>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {shop.foodItems && shop.foodItems.length > 0 ? (
              shop.foodItems.map((item: FoodItem, idx: number) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop&crop=center'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500 truncate">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.type && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'veg'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {item.type === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <FiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-sm font-medium text-gray-900">No menu items</h3>
                <p className="mt-2 text-sm text-gray-500">Get started by adding your first menu item.</p>
                <div className="mt-6">
                  <Link
                    to="/add-food-item"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Item
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopData;