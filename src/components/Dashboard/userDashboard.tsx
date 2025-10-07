import UserNavbar from '../Layout/userNavbar';
import Category from '../User/Category';
import Shop from '../User/Shop';
import SuggestedItems from '../User/SuggestedItems';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <UserNavbar />

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Craving Something Delicious?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Order from the best restaurants in your area and get fresh, hot food delivered right
              to your door
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="text-sm text-gray-500">🚀 Free delivery on orders over ₹299</span>
              <span className="text-sm text-gray-500">⚡ Average delivery time: 25 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">
        {/* Categories Section */}
        <section className="">
          <Category />
        </section>

        {/* Restaurants Section */}
        <section className="">
          <Shop />
        </section>

        {/* Suggested Items Section */}
        <section className="">
          <SuggestedItems />
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
