import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TrendingItem({ name, trend, priceChange, onClick }) {
  const isUp = trend === 'up';
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
    >
      <div className={`p-2 rounded-lg ${isUp ? 'bg-red-50' : 'bg-emerald-50'}`}>
        {isUp ? (
          <TrendingUp className="w-4 h-4 text-red-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-emerald-500" />
        )}
      </div>
      <div className="text-left">
        <p className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">{name}</p>
        <p className={`text-xs ${isUp ? 'text-red-500' : 'text-emerald-500'}`}>
          {isUp ? '+' : ''}{priceChange}%
        </p>
      </div>
    </button>
  );
}