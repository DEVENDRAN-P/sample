import React from 'react';
import { Apple, Carrot, Milk, Wheat, Flame, Droplet, Coffee, Cookie, Home, Sparkles } from 'lucide-react';

const categoryIcons = {
  vegetables: Carrot,
  fruits: Apple,
  dairy: Milk,
  grains: Wheat,
  spices: Flame,
  oils: Droplet,
  beverages: Coffee,
  snacks: Cookie,
  household: Home,
  personal_care: Sparkles,
  other: Sparkles
};

const categoryColors = {
  vegetables: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  fruits: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
  dairy: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  grains: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  spices: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  oils: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
  beverages: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  snacks: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
  household: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
  personal_care: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  other: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
};

export default function CategoryPill({ category, isActive, onClick }) {
  const Icon = categoryIcons[category] || Sparkles;
  const colors = categoryColors[category] || categoryColors.other;
  
  const displayName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
        isActive 
          ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25' 
          : colors
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{displayName}</span>
    </button>
  );
}