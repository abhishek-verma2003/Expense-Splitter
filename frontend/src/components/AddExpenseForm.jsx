import React, { useState } from "react";
import { addExpense } from "../api/api";

export default function AddExpenseForm({ groupId, members, onAdded }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMember = (id) => {
    setSplitAmong((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!desc.trim() || !amount || !paidBy || splitAmong.length === 0) {
      alert("Please fill in all fields and select at least one person to split with");
      return;
    }

    setLoading(true);
    try {
      await addExpense(groupId, {
        description: desc,
        amount: Number(amount),
        paidBy,
        splitAmong,
      });
      onAdded();
      setDesc("");
      setAmount("");
      setPaidBy("");
      setSplitAmong([]);
    } catch (error) {
      alert("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-8 animate-slideInRight">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold gradient-text mb-2">Add New Expense</h3>
        <p className="text-[#2d545e]">Track shared expenses and split costs fairly</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Description and Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-[#2d545e]">
              Description
            </label>
            <input
              placeholder="e.g. Dinner at restaurant"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="input-enhanced w-full rounded-xl p-4 text-[#2d545e] placeholder-[#2d545e]/50 focus:outline-none"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-[#2d545e]">
              Amount (₹)
            </label>
            <input
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="input-enhanced w-full rounded-xl p-4 text-[#2d545e] placeholder-[#2d545e]/50 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Paid By */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-[#2d545e]">
            Paid By
          </label>
          <select
            value={paidBy}
            onChange={e => setPaidBy(e.target.value)}
            className="input-enhanced w-full rounded-xl p-4 text-[#2d545e] focus:outline-none"
            required
          >
            <option value="" className="text-gray-500">Select who paid</option>
            {members.map(m => (
              <option key={m._id} value={m._id} className="text-gray-900">
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Split Among */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-[#2d545e]">
              Split Among
            </label>
            <span className="text-sm text-[#2d545e]/70">
              {splitAmong.length} selected
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
            {members.map((m, index) => (
              <label 
                key={m._id} 
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  splitAmong.includes(m._id)
                    ? 'bg-[#2d545e]/10 border-[#2d545e] text-[#2d545e]'
                    : 'bg-white/50 border-[#2d545e]/20 text-[#2d545e] hover:bg-[#2d545e]/5 hover:border-[#2d545e]/40'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <input 
                    type="checkbox" 
                    value={m._id}
                    checked={splitAmong.includes(m._id)}
                    onChange={() => toggleMember(m._id)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                    splitAmong.includes(m._id)
                      ? 'bg-[#2d545e] border-[#2d545e]'
                      : 'border-[#2d545e]/40 hover:border-[#2d545e]/60'
                  }`}>
                    {splitAmong.includes(m._id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {m.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{m.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button 
            type="submit" 
            disabled={loading || !desc.trim() || !amount || !paidBy || splitAmong.length === 0}
            className="btn-primary inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
