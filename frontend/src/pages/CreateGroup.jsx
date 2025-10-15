import React, { useEffect, useState } from "react";
import { createGroup, getUsers } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { 
    getUsers()
      .then(res => {
        setUsers(res.data);
        setUsersLoading(false);
      })
      .catch(() => setUsersLoading(false));
  }, []);

  const toggleUser = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || selected.length === 0) {
      alert("Please enter a group name and select at least one member");
      return;
    }
    
    setLoading(true);
    try {
      await createGroup({ name, members: selected });
      alert("Group Created Successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to create group. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (usersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        <div className="max-w-2xl mx-auto animate-fadeInUp">
          <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="skeleton h-9 w-56 mx-auto mb-4 bg-white/20 rounded-lg"></div>
              <div className="skeleton h-5 w-72 mx-auto bg-white/20 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="skeleton h-14 w-full bg-white/20 rounded-xl"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton h-20 rounded-xl bg-white/20"></div>
                ))}
              </div>
              <div className="skeleton h-14 w-40 mx-auto bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-2xl mx-auto animate-fadeInUp ">
        <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3">
              Create New Group
            </h2>
            <p className="text-white/80 text-lg font-medium">Set up a new expense group with your friends</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Group Name */}
            <div className="space-y-4">
              <label className="block text-xl font-semibold text-white mb-2">
                Group Name
              </label>
              <input
                placeholder="Enter a memorable name for your group"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-2xl p-5 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                required
              />
            </div>

            {/* Member Selection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-xl font-semibold text-white">
                  Select Members
                </label>
                <span className="text-lg font-semibold text-white/80 bg-white/10 px-4 py-2 rounded-xl">
                  {selected.length} selected
                </span>
              </div>
              
              {users.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-white/20">
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-lg">No users available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {users.map((u, index) => (
                    <label 
                      key={u._id} 
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm ${
                        selected.includes(u._id)
                          ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          value={u._id} 
                          onChange={() => toggleUser(u._id)}
                          className="sr-only"
                          checked={selected.includes(u._id)}
                        />
                        <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                          selected.includes(u._id)
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-transparent shadow-md'
                            : 'border-white/40 hover:border-white/60'
                        }`}>
                          {selected.includes(u._id) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-base">
                            {u.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-semibold text-lg text-white/90">{u.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit" 
                disabled={loading || !name.trim() || selected.length === 0}
                className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Group...
                  </>
                ) : (
                  <>
                    <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Group
                  </>
                )}
              </button>
            </div>  
          </form>
        </div>
      </div>
    </div>
  );
}