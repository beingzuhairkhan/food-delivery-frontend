import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditFoodItem = () => {
  // Pre-filled values (you can replace with props or fetched data)
  const [formData, setFormData] = useState({
    name: "Cheese Pizza",
    image: null,
    price: "299",
    category: "Pizza",
    type: "veg",
  });

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Updated food item:", formData);
    alert("Food Item Updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex flex-col items-center px-4 py-12">
      {/* Icon */}
      <div className="bg-orange-100 p-4 rounded-full shadow-md mb-4">
        <FiEdit className="w-12 h-12 text-orange-600" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-wide">
        Edit Food Item
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Food Name */}
        <div className="flex flex-col mb-5">
          <label className="mb-2 text-gray-700 font-semibold">Food Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Food Image */}
        <div className="flex flex-col mb-5">
          <label className="mb-2 text-gray-700 font-semibold">Food Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Price + Food Type */}
        <div className="flex flex-col md:flex-row gap-6 mb-5">
          {/* Price */}
          <div className="flex-1 flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Food Type */}
          <div className="flex-1 flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Food Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="veg">Veg </option>
              <option value="non-veg">Non-Veg </option>
              <option value="vegan">Vegan </option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col mb-8">
          <label className="mb-2 text-gray-700 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Burgers"> Burgers</option>
            <option value="Pizza">Pizza</option>
            <option value="Drinks"> Drinks</option>
            <option value="Desserts"> Desserts</option>
            <option value="Snacks"> Snacks</option>
          </select>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition transform hover:scale-[1.02]"
        >
          Update Food Item
        </button>
      </form>
    </div>
  );
};

export default EditFoodItem;
