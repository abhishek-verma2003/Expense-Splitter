import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export default function Landing() {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [activeFeature, setActiveFeature] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/home", { replace: true });
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate]);

  useEffect(() => {
    setAnimated(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "💰",
      title: "Split Expenses",
      desc: "Easily divide bills among friends and groups"
    },
    {
      icon: "📊",
      title: "Track Balances",
      desc: "See who owes whom at a glance"
    },
    {
      icon: "👥",
      title: "Group Management",
      desc: "Create and manage expense groups"
    },
    // {
    //   icon: "📱",
    //   title: "Real-time Sync",
    //   desc: "Updates instantly across all devices"
    // }
  ];

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleExplore = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">€$</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">SplitWise</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleExplore}
              className="px-6 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300"
            >
              Sign In
            </button>
            <button 
              onClick={handleGetStarted}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className={`text-6xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Split Expenses
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Fair & Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop worrying about who paid for what. Split bills, track debts, and settle up 
            with friends effortlessly. Your financial harmony starts here.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center space-x-6 mb-16">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Start Splitting</span>
              <span>→</span>
            </button>
            <button 
              onClick={handleExplore}
              className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-500">Expenses Split</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-500">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$1M+</div>
              <div className="text-gray-500">Total Settled</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Why Choose SplitWise?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            We make splitting expenses with friends, roommates, and family as easy as counting 1-2-3
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  activeFeature === index 
                    ? 'border-purple-500 shadow-xl' 
                    : 'border-transparent'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Ready to Simplify Your Splits?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users who've made expense splitting stress-free and fair.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Create Your Free Account
          </button>
        </div>
      </div>
    </div>
  );
}