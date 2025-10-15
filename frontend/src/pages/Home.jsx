import React, { useEffect, useState } from "react";
import { getGroups } from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem("user"));
    getGroups(user?._id)
      .then(res => {
        setGroups(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeInUp">
          {/* Animated Header Skeleton */}
          <div className="text-center space-y-6">
            <div className="skeleton h-12 w-64 mx-auto rounded-2xl mb-4"></div>
            <div className="skeleton h-6 w-96 mx-auto rounded-lg"></div>
          </div>
          
          {/* Animated Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 animate-pulse border border-white/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="skeleton w-14 h-14 rounded-2xl"></div>
                    <div className="space-y-2">
                      <div className="skeleton h-5 w-32 rounded-lg"></div>
                      <div className="skeleton h-4 w-20 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="skeleton w-6 h-6 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="skeleton h-4 w-full rounded-lg"></div>
                  <div className="skeleton h-2 w-full rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-6 relative">
          {/* Background Decorations */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -top-5 -right-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Your Groups
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Collaborate, split expenses, and manage shared finances with your circles
            </p>
          </div>

          {/* Stats Overview */}
          {/* <div className="flex justify-center items-center space-x-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{groups.length}</div>
              <div className="text-sm text-slate-500">Total Groups</div>
            </div>
            <div className="w-1 h-8 bg-slate-200/50 rounded-full"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {groups.reduce((acc, group) => acc + (group.members?.length || 0), 0)}
              </div>
              <div className="text-sm text-slate-500">Total Members</div>
            </div>
          </div> */}
        </div>

        {/* Groups Grid */}
        {groups.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center max-w-md mx-auto">
              {/* Animated Illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L3 13.5V15.5L9 14V16L3 17.5V19.5L9 18V22H15V18L21 19.5V17.5L15 16V14L21 15.5V13.5L15 12V10.5L21 9Z"/>
                    </svg>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-4 right-10 w-6 h-6 bg-yellow-400/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-6 left-10 w-4 h-4 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No Groups Yet</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Start your expense sharing journey by creating your first group. Invite friends, track expenses, and settle up effortlessly.
              </p>
              <Link
                to="/create-group"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Group
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-3 justify-center gap-6">
  {groups.map((group, index) => (
    <div
      key={group._id}
      className="relative group px-3 mb-6 flex-1 min-w-[250px] max-w-[300px]"
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Animated Background Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl transition-all duration-500 ${
          hoveredCard === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      ></div>

      <Link
        to={`/group/${group._id}`}
        className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 transition-all duration-500 hover:border-purple-200/50 hover:shadow-2xl hover:scale-[1.02] block ${
          hoveredCard === index ? "shadow-xl" : "shadow-sm"
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Header with Icon and Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`relative transition-transform duration-300 ${
                hoveredCard === index ? "scale-110 rotate-12" : ""
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              {/* Online Indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition-colors duration-300 line-clamp-1">
                {group.name}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {group.members?.length || 0}{" "}
                {group.members?.length === 1 ? "member" : "members"}
              </p>
            </div>
          </div>

          {/* Action Arrow */}
          <div
            className={`transition-all duration-300 ${
              hoveredCard === index
                ? "translate-x-1 scale-110 text-purple-500"
                : "text-slate-400"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Progress and Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Last activity</span>
            <span className="text-slate-700 font-medium">Recently</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-slate-200/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700 group-hover:from-purple-600 group-hover:to-blue-600"
                style={{
                  width: hoveredCard === index ? "85%" : "75%",
                  animation: "pulse 2s infinite",
                }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-between text-xs text-slate-500">
            <span>Active</span>
            <span>Updated now</span>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

        )}

        {/* Enhanced Quick Action */}
        {groups.length > 0 && (
          <div className="text-center pt-8">
            <Link
              to="/create-group"
              className="group inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl text-slate-700 font-semibold transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-xl hover:border-purple-200/50"
            >
              <div className="relative">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {/* Pulsing effect */}
                <div className="absolute inset-0 w-6 h-6 bg-purple-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              Create New Group
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}