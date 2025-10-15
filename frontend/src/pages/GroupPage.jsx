import React, { useEffect, useState } from "react";
import { getSummary, getGroups } from "../api/api";
import AddExpenseForm from "../components/AddExpenseForm";
import GroupSummary from "../components/GroupSummary";
import { useParams, Link } from "react-router-dom";

export default function GroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const [groupsRes, summaryRes] = await Promise.all([
          getGroups(user?._id),
          getSummary(id)
        ]);
        
        const g = groupsRes.data.find(gr => gr._id === id);
        setGroup(g);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error('Error loading group data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  async function loadSummary() {
    try {
      const res = await getSummary(id);
      setSummary(res.data);
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
          <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="skeleton h-9 w-72 mb-5 bg-white/20 rounded-lg"></div>
            <div className="skeleton h-5 w-40 bg-white/20 rounded-lg"></div>
          </div>
          <div className="skeleton h-96 rounded-3xl bg-white/20"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="skeleton h-80 rounded-3xl bg-white/20"></div>
            <div className="skeleton h-80 rounded-3xl bg-white/20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center py-20 animate-fadeInUp">
          <div className="glass-effect rounded-3xl p-12 max-w-md mx-auto backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Group Not Found</h3>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">The group you're looking for doesn't exist or you don't have access to it.</p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeInUp">
        {/* Group Header */}
        <div className="glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  {group.name}
                </h1>
                <p className="text-white/80 text-lg font-medium">
                  {group.members?.length || 0} {group.members?.length === 1 ? 'member' : 'members'} • Active group
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Members List */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white mb-4">Group Members</h3>
            <div className="flex flex-wrap gap-4">
              {group.members?.map((member, index) => (
                <div 
                  key={member._id}
                  className="flex items-center space-x-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm animate-slideIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-semibold text-white/90">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Expense Form */}  
        <AddExpenseForm groupId={id} members={group.members} onAdded={loadSummary} />

        {/* Group Summary */}
        {summary && <GroupSummary summary={summary} />}
      </div>
    </div>
  );
}