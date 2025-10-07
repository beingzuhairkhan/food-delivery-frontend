import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../data/dummyData';

const Category = () => {
  const navigate = useNavigate();
  const categories = getCategories();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Browse Categories</h2>
          <p className="text-gray-600">Find your favorite type of cuisine</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
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
              <p className="text-xs text-gray-500 mt-1">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
