import React, { useState } from 'react';
import { GiKnifeFork } from 'react-icons/gi';
import { addRestaurant } from '../../service/restaurant'
const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
    city: '',
    state: '',
    address: '',
    phone: '',
    email: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'image' && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();
  form.append('name', formData.name);
  form.append('city', formData.city);
  form.append('state', formData.state);
  form.append('address', formData.address);
  form.append('phone', formData.phone);
  form.append('email', formData.email);
  if (formData.image) {
    form.append('image', formData.image);
  }

  try {
    const res = await addRestaurant(form); // send FormData directly
    console.log('Restaurant added:', res);
    alert('Restaurant saved successfully!');
  } catch (err) {
    console.error('Error saving restaurant:', err);
    alert('Failed to save restaurant.');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      {/* Icon */}
      <GiKnifeFork className="w-16 h-16 text-orange-500 mb-4" />

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Shop</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        {/* Shop Name */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-700 font-medium">Shop Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Enter shop name"
            required
          />
        </div>

        {/* Shop Image */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-700 font-medium">Shop Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* City & State */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="City"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-2 text-gray-700 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="State"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-700 font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            rows={3}
            placeholder="Enter full address"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-gray-700 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="123-456-7890"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-6">
          <label className="mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="example@mail.com"
            required
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition text-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
