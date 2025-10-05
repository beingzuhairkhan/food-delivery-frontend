import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { GET_ALL_RESTAURANTS } from "../../graphql/queries/getRestaurant.queries";

interface Restaurant {
  name: string;
  image: string;
  city?: string;
  state?: string;
  address: string;
  phone: string;
  email: string;
}

interface RestaurantsData {
  restaurants: Restaurant[];
}

const Shop = () => {
  const { loading, error, data } = useQuery<RestaurantsData>(GET_ALL_RESTAURANTS);

  if (loading) return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popular Restaurants</h2>
          <p className="text-gray-600">Top rated restaurants in your area</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-48">
        <div className="text-lg text-gray-600">Loading restaurants...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popular Restaurants</h2>
          <p className="text-gray-600">Top rated restaurants in your area</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-48">
        <div className="text-lg text-red-600">Error loading restaurants: {error.message}</div>
      </div>
    </div>
  );

  const restaurants = data?.restaurants || [];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Popular Restaurants</h2>
          <p className="text-gray-600">Top rated restaurants in your area</p>
        </div>
        <button className="text-green-600 hover:text-green-700 font-medium text-sm md:text-base transition-colors duration-200">
          View All →
        </button>
      </div>

      {restaurants.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-lg text-gray-600">No restaurants available yet</p>
            <p className="text-sm text-gray-500">Check back later for more options</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant: Restaurant) => (
            <Link
              key={restaurant.name}
              to={`/restaurant/${encodeURIComponent(restaurant.name)}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden block"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&crop=center'}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center gap-1">
                    ⭐ {(Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    25-30 min
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">Mixed Cuisine</p>
                <p className="text-gray-500 text-xs mb-4">
                  {restaurant.city && restaurant.state 
                    ? `${restaurant.city}, ${restaurant.state}` 
                    : restaurant.address
                  }
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Free delivery</span>
                  <span className="text-green-600 font-medium">
                    {Math.floor(Math.random() * 100) + 10} reviews
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
