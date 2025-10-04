const shops = [
  {
    name: "Krishna Bakery",
    rating: 4.8,
    deliveryTime: "25-30 min",
    cuisine: "Bakery & Sweets",
    image:
      "https://thumbs.dreamstime.com/z/whole-foods-store-fruits-vegetables-display-inside-london-high-street-kensington-55110493.jpg",
  },
  {
    name: "Chanchal Burger Corner",
    rating: 4.5,
    deliveryTime: "20-25 min",
    cuisine: "Fast Food",
    image:
      "https://antdisplay.com/pub/media/interior_design/fast_food_shop_3_.jpg",
  },
  {
    name: "Pizza Hub",
    rating: 4.7,
    deliveryTime: "30-35 min",
    cuisine: "Italian",
    image:
      "https://img.freepik.com/free-photo/interior-modern-pizzeria-restaurant_181624-28273.jpg",
  },
];

const Shop = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center gap-1">
                  ⭐ {shop.rating}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {shop.deliveryTime}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                {shop.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{shop.cuisine}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Free delivery</span>
                <span className="text-green-600 font-medium">Open now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
