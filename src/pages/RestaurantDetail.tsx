import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { FaStar, FaShoppingCart, FaArrowLeft, FaMapPin, FaPhone, FaClock } from "react-icons/fa";
import { GET_RESTAURANT_BY_NAME_WITH_FOOD_ITEMS } from "../graphql/queries/getRestaurant.queries";
import { useCart } from "../contexts/CartContext";
import UserNavbar from "../components/Layout/userNavbar";

interface FoodItem {
  name: string;
  price: number;
  image: string;
  category: string;
  type?: string;
}

interface RestaurantData {
  restaurantByName: {
    name: string;
    image: string;
    city?: string;
    state?: string;
    address: string;
    phone: string;
    email: string;
    foodItems: FoodItem[];
  };
}

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantName = id ? decodeURIComponent(id) : '';
  
  // Use the new restaurantByName query to fetch restaurant with food items
  const { loading, error, data } = useQuery<RestaurantData>(GET_RESTAURANT_BY_NAME_WITH_FOOD_ITEMS, {
    variables: { name: restaurantName },
    skip: !restaurantName,
  });
  const { addItemToCart } = useCart();

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Restaurant</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  const restaurant = data?.restaurantByName;
  
  if (!restaurant) return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  // Mock data for missing fields
  const mockRating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
  const mockReviews = Math.floor(Math.random() * 100) + 10;
  const availableFoodItems = restaurant.foodItems || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Restaurants
        </Link>
      </div>

      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Restaurant Image */}
            <div className="lg:col-span-1">
              <img
                src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&crop=center'}
                alt={restaurant.name}
                className="w-full h-64 lg:h-80 object-cover rounded-2xl"
              />
            </div>

            {/* Restaurant Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {restaurant.name}
                </h1>
                <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
                  <FaStar className="text-yellow-400 mr-2" />
                  <span className="font-semibold text-gray-900">
                    {mockRating}
                  </span>
                  <span className="text-gray-600 ml-1">
                    ({mockReviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-lg text-green-600 font-medium">
                  Mixed Cuisine
                </p>
                
                <div className="flex items-center text-gray-600">
                  <FaMapPin className="mr-3 text-green-600" />
                  <span>
                    {restaurant.city && restaurant.state 
                      ? `${restaurant.address}, ${restaurant.city}, ${restaurant.state}` 
                      : restaurant.address
                    }
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-3 text-green-600" />
                  <span>{restaurant.phone}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-3 text-green-600" />
                  <span>Delivery: 25-30 min • Free delivery on orders above ₹299</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Open now
                </span>
                <span className="text-gray-600 text-sm">
                  {availableFoodItems.length} items available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Menu Items</h2>
          <p className="text-gray-600">Fresh ingredients, authentic flavors</p>
        </div>

        {availableFoodItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Items Available</h3>
            <p className="text-gray-500">This restaurant hasn't added any menu items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableFoodItems.map((item: FoodItem) => (
              <div
                key={item.name}
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

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    "Delicious and freshly prepared"
                  </p>

                  {/* Category */}
                  <p className="text-gray-500 text-xs mb-4">
                    {item.category}
                  </p>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => {
                      // Convert FoodItem to MenuItem format for cart
                      const menuItem = {
                        id: item.name, // Use name as ID since _id is not available
                        name: item.name,
                        description: 'Delicious and freshly prepared', // Mock description
                        price: item.price,
                        category: item.category,
                        imageUrl: item.image,
                        isVegetarian: item.type === 'veg',
                        isAvailable: true // Mock availability
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
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;