import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaMinus, FaLeaf, FaSeedling } from 'react-icons/fa';
import { getCategoryById, getFoodItemsByCategory } from '../data/dummyData';
import { useCart } from '../contexts/CartContext';
import type { MenuItem } from '../contexts/CartContext';
import UserNavbar from '../components/Layout/userNavbar';

const CategoryItems = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { addItemToCart, cartItems, updateQuantity } = useCart();

  // Get category and food items
  const category = categoryId ? getCategoryById(categoryId) : null;
  const foodItems = categoryId ? getFoodItemsByCategory(categoryId) : [];

  // Get quantity of item in cart
  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    addItemToCart(item);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (item: MenuItem) => {
    const currentQuantity = getItemQuantity(item.id);
    updateQuantity(item.id, currentQuantity + 1);
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

  // Show error if category not found
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
            <Link
              to="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          Back to Categories
        </Link>
      </div>

      {/* Category Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-full md:w-48 h-32 md:h-32">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{category.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{foodItems.length} items available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {foodItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              const isInCart = quantity > 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden"
                >
                  {/* Food Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={
                        item.imageUrl ||
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
                      }
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Food Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex gap-1 ml-2">
                        {item.isVegetarian && (
                          <FaLeaf className="text-green-500 text-sm" title="Vegetarian" />
                        )}
                        {item.isVegan && (
                          <FaSeedling className="text-green-600 text-sm" title="Vegan" />
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                          {item.isGlutenFree && <span>Gluten-free</span>}
                          {item.isVegan && <span>Vegan</span>}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="flex items-center">
                        {!isInCart ? (
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.isAvailable}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            <FaPlus className="w-3 h-3 mr-1" />
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center bg-green-600 rounded-lg">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
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
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
