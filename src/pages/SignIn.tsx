import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

const SignIn: React.FC = () => {
  const { login , user } = useAuth();
  const navigate = useNavigate();
if (user) {
    if (user.role === 'restaurant') return <Navigate to="/restaurant" replace />;
    if (user.role === 'user') return <Navigate to="/" replace />;
    if (user.role === 'delivery') return <Navigate to="/delivery" replace />;
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(formData.email, formData.password); // login sets user in context/localStorage
      // console.log("Data" , data)
      setLoading(false);
      navigate("/"); // optional: redirect to home or let ProtectedRoute handle it
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
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
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
