import React from "react";

const categories = [
  { name: "Sweets", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Main Course", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Desserts", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Pizza", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Burgers", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Sandwiches", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
   { name: "Sweets", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Main Course", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Desserts", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Pizza", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Burgers", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
  { name: "Sandwiches", image: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-best-hd-photos.jpg" },
];

const Category = () => {
  return (
    <div className="my-8 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Category</h2>
      
           <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex space-x-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-28 object-cover rounded-t-2xl"
              />
              <div className="text-center py-3 text-base font-semibold text-gray-700">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
