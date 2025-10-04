

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
  // Remove duplicates and limit to unique categories
  const uniqueCategories = categories.slice(0, 6);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Browse Categories</h2>
          <p className="text-gray-600">Find your favorite type of cuisine</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {uniqueCategories.map((category, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="aspect-square relative overflow-hidden rounded-t-2xl">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-green-600 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
