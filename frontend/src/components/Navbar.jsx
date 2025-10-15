import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // logout action

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 glass-effect backdrop-blur-xl border-b border-white/20 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-base">ES</span>
            </div>
            <h1 className="text-2xl font-bold  bg-black bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Expense Splitter
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/home"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive("/home")
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-white shadow-lg"
                      : "bg-gradient-to-r from-purple-600/60 to-blue-600/60 text-white border border-white/60"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/create-group"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive("/create-group")
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-white shadow-lg"
                      : "bg-gradient-to-r from-purple-600/60 to-blue-600/60 text-white border border-white/60"
                  }`}
                >
                  Create Group
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-red-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive("/signin")
                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-white shadow-lg"
                      : "bg-gradient-to-r from-purple-600/60 to-blue-600/60 text-white border border-white/60"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive("/signup")
                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-white shadow-lg"
                      : "bg-gradient-to-r from-purple-600/60 to-blue-600/60 text-white border border-white/60"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-sm"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeInUp mt-3">
            <div className="px-3 pt-3 pb-4 space-y-2 glass-effect backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/home"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      isActive("/home")
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-white/20"
                        : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/create-group"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      isActive("/create-group")
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-white/20"
                        : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    Create Group
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 border border-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      isActive("/signin")
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-white/20"
                        : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      isActive("/signup")
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-white/20"
                        : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}