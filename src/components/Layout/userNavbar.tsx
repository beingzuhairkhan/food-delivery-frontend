import { useState } from "react";
import { Search, ShoppingCart, MapPin, User, LogOut, Menu, X } from "lucide-react";
import useGeolocation from '../../hooks/useGeolocation'
import { Link } from "react-router-dom";
import { useCart } from '../../contexts/CartContext.tsx';
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useWallet } from "../../contexts/WalletContext";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {logout , user} = useAuth()
  // use custom geolocation hook
  const location = useGeolocation();

  // use cart context
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const { balance } = useWallet();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo + Location */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                QuickBite
              </h1>
            </Link>

            {/* Location - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors cursor-pointer group">
              <MapPin className="w-4 h-4 text-gray-600 group-hover:text-green-600 transition-colors" />
              <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                {location.location.split(",")[0].trim() || "Getting location..."}
              </span>
            </div>
          </div>

          {/* Middle: Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right: Cart + Profile */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="group">
              <div className="flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-full hover:bg-gray-100 transition-all duration-200">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-pulse">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Cart
                </span>
              </div>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 md:px-4 md:py-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.slice(0,1)}
                </div>
                <span className="hidden md:block font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Account
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Content */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-20">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                            {user?.name?.slice(0,1)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <Link to="/myorders" >
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        <ShoppingCart  className="w-4 h-4" />
                        <span>My Orders</span>
                      </button>
                      </Link>

                      <Link to="/wallet">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 text-white text-[10px]">₹</span>
                        <span>Wallet (₹{balance.toFixed(2)})</span>
                      </button>
                      </Link>

                      <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      onClick={logout}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search food..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Mobile Location */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {location.location.split(",")[0].trim() || "Getting location..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
