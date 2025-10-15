import React from "react";

export default function GroupSummary({ summary }) {
  if (!summary) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-8 animate-pulse">
          <div className="skeleton h-6 w-32 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton h-12 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-8 animate-pulse">
          <div className="skeleton h-6 w-40 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton h-12 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp">
      {/* Balances Section */}
      <section className="glass rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold gradient-text">Balances</h3>
        </div>
        
        {(!summary?.balances || summary.balances.length === 0) ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#2d545e] text-lg">No balances yet</p>
            <p className="text-[#2d545e]/70 text-sm">Add some expenses to see balances</p>
          </div>
        ) : (
          <div className="space-y-4">
            {summary.balances.map((b, index) => {
              const isPositive = Number(b.amount) >= 0;
              const amount = Number(b.amount);
              return (
                <div 
                  key={b.id} 
                  className="flex items-center justify-between p-4 bg-[#2d545e]/5 rounded-xl hover:bg-[#2d545e]/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {b.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[#2d545e] font-medium text-lg">{b.name}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                    isPositive 
                      ? 'status-positive' 
                      : 'status-negative'
                  }`}>
                    {isPositive ? '+' : ''}₹{Math.abs(amount).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Settlement Suggestions Section */}
      <section className="glass rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold gradient-text">Settlement Suggestions</h3>
        </div>
        
        {(!summary.settlements || summary.settlements.length === 0) ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#2d545e] text-lg">All settled up!</p>
            <p className="text-[#2d545e]/70 text-sm">No payments needed</p>
          </div>
        ) : (
          <div className="space-y-4">
            {summary.settlements.map((s, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-[#2d545e]/5 rounded-xl hover:bg-[#2d545e]/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {s.from.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-[#2d545e]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="w-8 h-8 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {s.to.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#2d545e]">
                    <span className="font-medium">{s.from}</span>
                    <span className="text-[#2d545e]/70 mx-2">should pay</span>
                    <span className="font-medium">{s.to}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-[#2d545e]/10 text-[#2d545e] rounded-lg font-bold">
                  ₹{Number(s.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
