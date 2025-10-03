import React from "react";

const shops = [
  {
    name: "Krishna Bakery",
    image:
      "https://thumbs.dreamstime.com/z/whole-foods-store-fruits-vegetables-display-inside-london-high-street-kensington-55110493.jpg",
  },
  {
    name: "Chanchal Burger Corner",
    image:
      "https://antdisplay.com/pub/media/interior_design/fast_food_shop_3_.jpg",
  },
  {
    name: "Pizza Hub",
    image:
      "https://img.freepik.com/free-photo/interior-modern-pizzeria-restaurant_181624-28273.jpg",
  },
];

const Shop = () => {
  return (
    <div className="my-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6"> Best shops </h2>

      {/* Slider container */}
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-32 object-cover rounded-t-2xl"
            />
            <div className="text-center py-3 text-base font-semibold text-gray-700">
              {shop.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
