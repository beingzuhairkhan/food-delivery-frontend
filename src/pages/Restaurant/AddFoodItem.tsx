import React, { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import axios from "axios";

const API_URL = "http://localhost:3000"; // replace with your API URL

const AddFoodItem: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    price: "",
    category: "",
    type: "veg",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "image" && (e.target as HTMLInputElement).files?.length) {
      const file = (e.target as HTMLInputElement).files![0];
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, price, category, type, image } = formData;

    if (!name || !price || !category) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const data = new FormData();
    data.append("name", name.trim());
    data.append("price", price.toString());
    data.append("type", type);
    data.append("category", category);
    if (image) data.append("image", image);

    try {
      console.log(" Sending FormData:", Object.fromEntries(data.entries()));

      const res = await axios.post(`${API_URL}/restaurant/create-item`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Food Item Added:", res.data);
      alert(" Food Item Added Successfully!");

      // Reset form
      setFormData({
        name: "",
        image: null,
        price: "",
        category: "",
        type: "veg",
      });
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err);
      alert("Failed to add food item. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-br from-orange-50 to-gray-100">
      {/* Icon */}
      <div className="bg-orange-100 p-4 rounded-full shadow-md mb-4">
        <GiKnifeFork className="w-12 h-12 text-orange-600" />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-wide">
        Add Food Item
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Name */}
        <div className="flex flex-col mb-5">
          <label className="mb-2 font-semibold text-gray-700">Food Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter food name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Image */}
        <div className="flex flex-col mb-5">
          <label className="mb-2 font-semibold text-gray-700">Food Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {formData.image && (
            <span className="text-sm text-gray-500 mt-1">
              📸 {formData.image.name}
            </span>
          )}
        </div>

        {/* Price & Type */}
        <div className="flex flex-col md:flex-row gap-6 mb-5">
          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 199"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Food Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col mb-8">
          <label className="mb-2 font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Burgers">Burgers</option>
            <option value="Pizza">Pizza</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-[1.02]"
        >
          Save Food Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
