import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
  };

  const handleAddFoodItem = () => {
    navigate("/add-food-item"); // navigate to add food item page
  };

  return (
    <header className=" text-black shadow">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Branding */}
        <div className="text-2xl font-extrabold text-gray-900">Foodie</div>

        {/* Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleAddFoodItem}
            className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
          >
            + Add Food Item
          </button>

          <div className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="font-medium">My Orders</span>
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <div
              onClick={handleProfileClick}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer text-lg font-semibold"
            >
              F
            </div>

            {/* Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                <p className="px-4 py-2 text-sm text-gray-800">Foodie User</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantNavbar;
