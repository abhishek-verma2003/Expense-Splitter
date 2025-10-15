import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice.js"; // import redux action
import { registerUser } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

// const { isLoggedIn, token } = useSelector((state) => state.auth);

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Auto redirect if token exists and valid
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/home");
        } else {
          // token expired → remove it
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Update Redux state
        dispatch(loginSuccess({ token: response.data.token }));

        // Redirect to home
        navigate("/home");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>

          {/* Optional: Login link */}
          <p className="text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
