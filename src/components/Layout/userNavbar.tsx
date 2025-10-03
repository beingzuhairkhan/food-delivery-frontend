import React, { useState } from "react";
import { Search, ShoppingCart, MapPin } from "lucide-react";
import useGeolocation from '../../hooks/useGeolocation'

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // use custom geolocation hook
  const location = useGeolocation();

  return (
    <header className="bg-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-black">
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-800">Foodie</h1>

          {/* Location */}
          <div className="flex items-center gap-2 cursor-pointer bg-gray-300 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 text-gray-700" />
            <span className="font-medium text-gray-800">
              {location || "Fetching location..."}
            </span>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 mx-6">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Search className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="flex-1 ml-2 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right: Cart + Profile */}
        <div className="flex items-center gap-6 relative">
          {/* Cart */}
          <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition">
            {/* Icon with badge */}
            <div className="relative">
              <ShoppingCart className="text-gray-800 w-6 h-6" />
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </div>

            <span className="font-medium text-gray-800">My Orders</span>
          </div>


          {/* Profile Circle */}
          <div className="relative">
            <button
              className="bg-gray-800 text-white font-bold w-9 h-9 rounded-full flex items-center justify-center shadow hover:bg-gray-700 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Z
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <p className="px-4 py-2 text-gray-700 font-medium border-b">
                  Zuhair Khan
                </p>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
