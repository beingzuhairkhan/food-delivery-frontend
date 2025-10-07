import { FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';
import { useQuery } from '@apollo/client/react';
import { GET_RECOMMENDED_ITEMS } from '../../graphql/queries/getRestaurant.queries.ts';
import { useCart } from '../../contexts/CartContext.tsx';

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
  const { addItemToCart, cartItems, updateQuantity } = useCart();

  // Get quantity of item in cart
  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle add to cart
  const handleAddToCart = (item: RecommendedItem) => {
    const menuItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      category: item.category,
      imageUrl:
        item.image ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      isVegetarian: item.type === 'veg',
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
    };
    addItemToCart(menuItem);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (item: RecommendedItem) => {
    const currentQuantity = getItemQuantity(item._id);
    updateQuantity(item._id, currentQuantity + 1);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId: string) => {
    const currentQuantity = getItemQuantity(itemId);
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      updateQuantity(itemId, 0); // This will remove the item
    }
  };

  if (loading)
    return (
      <div className="my-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-gray-600">Loading recommended items...</div>
        </div>
      </div>
    );

  if (error)
    return (
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
        {availableItems.map((item: RecommendedItem) => {
          const quantity = getItemQuantity(item._id);
          const isInCart = quantity > 0;

          return (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden"
            >
              {/* Food Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={
                    item.image ||
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
                  }
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Food Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{item.name}</h3>
                  <div className="flex gap-1 ml-2">
                    {item.type === 'veg' && (
                      <FaLeaf className="text-green-500 text-sm" title="Vegetarian" />
                    )}
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-1">
                    From <span className="font-medium text-gray-700">{item.restaurant.name}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.restaurant.city}, {item.restaurant.state}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                      {item.type === 'veg' && <span>Vegetarian</span>}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex items-center">
                    {!isInCart ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        <FaPlus className="w-3 h-3 mr-1" />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center bg-green-600 rounded-lg">
                        <button
                          onClick={() => handleDecreaseQuantity(item._id)}
                          className="p-2 text-white hover:bg-green-700 rounded-l-lg transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-2 text-white font-medium min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="p-2 text-white hover:bg-green-700 rounded-r-lg transition-colors"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedItems;
