import React, { useState } from "react";
import { Link } from "react-router-dom"; 

// Applyying the mutation
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../graphql/mutations/auth.graphql";

// Type definitions for the mutation response
interface LoginUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface LoginResponse {
  login: {
    token: string;
    user: LoginUser;
  };
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Using login mutation hook
  const [login, {data, loading, error}] = useMutation<LoginResponse>(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    //Calling the login funtion mutation
    login({
      variables:{
        email: formData.email,
        password: formData.password
      }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* 4. Display loading, error, and success states */}
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">Error: {error.message || 'An error occurred'}</p>}
        {data && data.login && (
          <div className="text-center text-green-500 mt-4">
            <p>Login Successful!</p>
            <p>Token: {data.login.token}</p>
          </div>
        )}


        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
